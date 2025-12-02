"use client";
import { useFormik } from "formik";
import { formikSignInSchema } from "../validation/signIn.validation";
import { INITIAL_VALUES } from "../signIn.constants";
import { TFormValues } from "../signIn.types";

const useSignIn = () => {
  const handleSignIn = async (
    values: TFormValues,
    resetForm: () => void,
    setSubmitting: (submitting: boolean) => void,
  ) => {
    setSubmitting(false);
    resetForm();
    console.log(values);
  };
  const formik = useFormik<TFormValues>({
    initialValues: INITIAL_VALUES,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      handleSignIn(values, resetForm, setSubmitting);
    },
    validationSchema: formikSignInSchema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
  });
  return { formik };
};
export default useSignIn;
