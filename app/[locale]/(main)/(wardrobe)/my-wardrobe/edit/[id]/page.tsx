import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { findAllCategoriesAction } from "@/modules/category/category.action";
import { findAllBrandsAction } from "@/modules/brand/brand.action";
import { getWardrobeItemDetailsAction } from "@/modules/wardrobe/wardrobe.action";
import WardrobeFrom from "@/modules/wardrobe/wardrobe-form/wardrobeFrom";
import { Skeleton } from "@/components/ui/skeleton";
import type { CreateWardrobeForm } from "@/modules/wardrobe/constant";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Wardrobe.editItem");
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

// Server component to fetch categories
async function CategoriesLoader() {
  const response = await findAllCategoriesAction();

  if (!response.success) {
    throw new Error("Failed to load categories");
  }

  return response.data;
}

// Server component to fetch brands
async function BrandsLoader() {
  const response = await findAllBrandsAction();

  if (!response.success) {
    throw new Error("Failed to load brands");
  }

  return response.data;
}

// Server component to fetch wardrobe item
async function WardrobeItemLoader(id: string) {
  const response = await getWardrobeItemDetailsAction({ id });

  if (!response.success) {
    notFound();
  }

  return response.data;
}

// Loading skeleton component
function FormSkeleton() {
  return (
    <div className="container mx-auto px-4 mt-12 max-w-4xl space-y-8">
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    </div>
  );
}

// Main page component
export default async function EditWardrobeItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<FormSkeleton />}>
      <EditWardrobeItemContent id={id} />
    </Suspense>
  );
}

// Content component that fetches data
async function EditWardrobeItemContent({ id }: { id: string }) {
  const [categories, brands, wardrobeItem] = await Promise.all([
    CategoriesLoader(),
    BrandsLoader(),
    WardrobeItemLoader(id),
  ]);

  // Find the category name from the category ID
  const category = categories.find((cat) => cat.id === wardrobeItem?.categoryId);

  // Transform the wardrobe item to the form format
  const initialData: CreateWardrobeForm = {
    id: wardrobeItem?.id,
    name: wardrobeItem?.name || "",
    categoryName: category?.name || "",
    brand: wardrobeItem?.brand || "",
    color: wardrobeItem?.color || "",
    size: wardrobeItem?.size || "",
    season: wardrobeItem?.season || "",
    style: wardrobeItem?.style || "CASUAL",
    purchasedDate: wardrobeItem?.purchasedDate.toISOString().split("T")[0] || "",
    notes: wardrobeItem?.notes || "",
    imageUrls: wardrobeItem?.images.map((img) => img.imageUrl) || [],
  };

  return <WardrobeFrom categories={categories} brands={brands} initialData={initialData} />;
}
