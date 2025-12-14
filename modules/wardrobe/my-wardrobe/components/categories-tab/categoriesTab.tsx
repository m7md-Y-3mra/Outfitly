import { findAllCategoriesAction } from "@/modules/category/category.action";
import Categories from "./categories";

const CategoriesTab = async () => {
  const res = await findAllCategoriesAction();
  if (!res.success) {
    throw new Error("Failed to fetch categories");
  }
  return <Categories categories={res.data} />;
};

export default CategoriesTab;
