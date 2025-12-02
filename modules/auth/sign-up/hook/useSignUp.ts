import { TFormValues } from "../types";
import { useFormik } from "formik";
import { INITIAL_VALUES } from "../constants";
import { formikSignUpSchema } from "../validation/signUp.validation";

const useSignUp = () => {
  const handleSignUp = async (
    values: TFormValues,
    resetForm: () => void,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    console.log(values);
    resetForm();
    setSubmitting(false);
  };
  const formik = useFormik<TFormValues>({
    initialValues: INITIAL_VALUES,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      handleSignUp(values, resetForm, setSubmitting);
    },
    validationSchema: formikSignUpSchema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
  });
  return {
    formik,
  };
};

export default useSignUp;
