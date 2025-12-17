import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CREATE_WARDROBE_INITIAL_VALUES, type CreateWardrobeForm } from "../../constant";
import { formikWardrobeFormSchema } from "../validation/wardrobeForm.validation";
import { createWardrobeItemAction, updateWardrobeItemAction } from "../../wardrobe.action";
import type { Category } from "@/app/generated/prisma/browser";
import type { CreateWardrobeItemDTO, UpdateWardrobeItemDTO } from "../../types/dto.types";

interface UseWardrobeFormParams {
  initialData?: CreateWardrobeForm | null;
  onSuccess?: () => void;
  categories: Category[];
}

const useWardrobeForm = ({ initialData, onSuccess, categories }: UseWardrobeFormParams) => {
  const router = useRouter();
  const isEditMode = !!initialData?.id;

  const handleSubmit = async (
    values: CreateWardrobeForm,
    resetForm: () => void,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    try {
      // Transform categoryName to categoryId
      const category = categories.find((cat) => cat.name === values.categoryName);

      if (!category) {
        toast.error("Selected category not found");
        setSubmitting(false);
        return;
      }

      if (isEditMode && initialData?.id) {
        // Update mode
        // Ensure purchasedDate is a Date object
        const purchasedDate = typeof values.purchasedDate === 'string'
          ? new Date(values.purchasedDate)
          : values.purchasedDate;

        const updateData: UpdateWardrobeItemDTO = {
          id: initialData.id,
          name: values.name,
          categoryId: category.id,
          brand: values.brand,
          color: values.color,
          size: values.size,
          season: values.season,
          style: values.style,
          purchasedDate: purchasedDate,
          notes: values.notes,
        };

        const response = await updateWardrobeItemAction(updateData);

        if (response.success) {
          toast.success("Wardrobe item updated successfully");
          onSuccess?.();
          router.push("/my-wardrobe");
          router.refresh();
        } else {
          toast.error(JSON.stringify(response.errors) || "Failed to update item");
        }
      } else {
        // Create mode
        // Ensure purchasedDate is a Date object
        const purchasedDate = typeof values.purchasedDate === 'string'
          ? new Date(values.purchasedDate)
          : values.purchasedDate;

        const createData: CreateWardrobeItemDTO = {
          name: values.name,
          categoryId: category.id,
          brand: values.brand,
          color: values.color,
          size: values.size,
          season: values.season,
          style: values.style,
          purchasedDate: purchasedDate,
          notes: values.notes,
          imageUrls: values.imageUrls,
        };

        const response = await createWardrobeItemAction(createData);

        if (response.success) {
          toast.success("Wardrobe item created successfully");
          resetForm();
          onSuccess?.();
          router.push("/my-wardrobe");
          router.refresh();
        } else {
          toast.error(JSON.stringify(response.errors) || "Failed to create item");
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<CreateWardrobeForm>({
    initialValues: initialData || CREATE_WARDROBE_INITIAL_VALUES,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      handleSubmit(values, resetForm, setSubmitting);
    },
    validationSchema: formikWardrobeFormSchema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: true,
  });

  return { formik };
};

export default useWardrobeForm;
