"use client";
import { useFormik } from "formik";
import { formikSignInSchema } from "../validation/signIn.validation";
import { INITIAL_VALUES } from "../signIn.constants";
import { TFormValues } from "../signIn.types";
import { signInAction } from "../../auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const useSignIn = () => {
  const navigate = useRouter();
  const handleSignIn = async (
    values: TFormValues,
    resetForm: () => void,
    setSubmitting: (submitting: boolean) => void,
  ) => {
    const data = await signInAction(values);
    setSubmitting(false);
    
    if(!data.success) {
      toast.error(data.message);
      return;
    }

    toast.success('Sign in successful');

    navigate.push('/');
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
