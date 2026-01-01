"use client";
import { motion } from "framer-motion";
import { useRouter } from "nextjs-toploader/app";
import { S3_BUCKET_NAME } from "@/config/env.config";
import Uploader from "@/components/uploader";
import { Form, FormikProvider } from "formik";
import ItemDetailsForm from "./components/item-details-form";
import CustomButton from "@/components/custom-button";
import useWardrobeForm from "./hook/useWardrobeForm";
import type { CreateWardrobeForm } from "../constant";
import type { Category } from "@/app/generated/prisma/browser";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { useTranslations } from "next-intl";

interface WardrobeFormProps {
  initialData?: CreateWardrobeForm | null;
  onSuccess?: () => void;
  categories: Category[];
  brands: string[];
}

const WardrobeFrom: React.FC<WardrobeFormProps> = ({
  initialData,
  onSuccess,
  categories,
  brands,
}) => {
  const navigate = useRouter();
  const { formik } = useWardrobeForm({ initialData, onSuccess, categories });
  const t = useTranslations("Wardrobe");
  const tCommon = useTranslations("Common");

  const handleImageUpload = (key?: string) => {
    const url = `https://${S3_BUCKET_NAME}.fly.storage.tigris.dev/${key}`;
    formik.setValues((prevValues) => ({
      ...prevValues,
      imageUrls: [...prevValues.imageUrls, url],
    }));
  };

  const handleImageDelete = (key?: string) => {
    const url = `https://${S3_BUCKET_NAME}.fly.storage.tigris.dev/${key}`;
    formik.setValues((prevValues) => ({
      ...prevValues,
      imageUrls: prevValues.imageUrls.filter((imageUrl) => imageUrl !== url),
    }));
  };

  const handleCancel = () => {
    navigate.push("/my-wardrobe");
  };

  // Check if form is valid for submission
  const isFormValid = useMemo(() => {
    const { name, categoryName, brand, color, size, season, style, imageUrls } = formik.values;
    return (
      name.trim() &&
      categoryName.trim() &&
      brand.trim() &&
      color.trim() &&
      size.trim() &&
      season.trim() &&
      style &&
      imageUrls.length > 0 &&
      !formik.isSubmitting
    );
  }, [formik.values, formik.isSubmitting]);

  return (
    <main className="pt-20 pb-16">
      {/* Page Header with Gradient */}
      <PageHeader
        title={initialData ? t("editItem.heading") : t("addItem.heading")}
        subtitle={initialData ? t("editItem.subtitle") : t("addItem.subtitle")}
        backTo="/my-wardrobe"
      />
      <div className="container mx-auto px-4 mt-12 max-w-4xl">
        <FormikProvider value={formik}>
          <Form className="space-y-8">
            {/* Image Upload Section */}
            <Uploader
              onImageUpload={handleImageUpload}
              onImageDelete={handleImageDelete}
              initialImages={formik.values.imageUrls}
            />

            {/* Item Details Form */}
            <ItemDetailsForm categories={categories} brands={brands} />

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-end pt-6"
            >
              <CustomButton
                type="button"
                onClick={handleCancel}
                variant="link"
                className="px-8 py-4 rounded-xl bg-white dark:bg-[#2A2A30] text-[#4C1420] dark:text-white border-2 border-[#F2E8E3] dark:border-[#35353D] hover:border-[#671425] dark:hover:border-[#8B1D35] transition-all duration-300"
              >
                {tCommon("cancel")}
              </CustomButton>
              <CustomButton
                type="submit"
                variant="gradient"
                disabled={!isFormValid || formik.isSubmitting}
                loading={formik.isSubmitting}
              >
                {formik.isSubmitting
                  ? initialData
                    ? t("form.updating")
                    : t("form.saving")
                  : initialData
                    ? t("form.updateButton")
                    : t("form.saveButton")}
              </CustomButton>
            </motion.div>
          </Form>
        </FormikProvider>
      </div>
    </main>
  );
};

export default WardrobeFrom;
