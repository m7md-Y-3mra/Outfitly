"use client";
import { useFormik } from "formik";
import { formikSignInSchema } from "../validation/signIn.validation";
import { INITIAL_VALUES } from "../signIn.constants";
import { TFormValues } from "../signIn.types";
import { signInAction } from "../../auth.actions";

const useSignIn = () => {
  const handleSignIn = async (
    values: TFormValues,
    resetForm: () => void,
    setSubmitting: (submitting: boolean) => void,
  ) => {
    const data = await signInAction(values);
    console.log(data);
    setSubmitting(false);
    resetForm();
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
