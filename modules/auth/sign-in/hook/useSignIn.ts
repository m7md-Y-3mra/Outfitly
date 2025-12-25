"use client";
import { useFormik } from "formik";
import { formikSignInSchema } from "../validation/signIn.validation";
import { INITIAL_VALUES } from "../signIn.constants";
import { TFormValues } from "../signIn.types";
import { signInAction } from "../../auth.actions";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { useAuth } from "@/providers/auth/auth.provider";

const useSignIn = () => {
  const navigate = useRouter();
  const { applySignedIn } = useAuth();

  const handleSignIn = async (
    values: TFormValues,
    resetForm: () => void,
    setSubmitting: (submitting: boolean) => void,
  ) => {
    const data = await signInAction(values);
    setSubmitting(false);

    if (!data.success) {
      if (data.statusCode == 400) toast.error("Invalid Credentials!");
      else toast.error("Internal Server Error!");
      return;
    }

    toast.success("Sign in successful");
    applySignedIn(data.data.user);
    navigate.push("/");
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
