import { TFormValues } from "../signUp.types";
import { useFormik } from "formik";
import { INITIAL_VALUES } from "../signUp.constants";
import { formikSignUpSchema } from "../validation/signUp.validation";
import { TCreateUser } from "@/modules/user/user.types";
import { signUpAction } from "../../auth.actions";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";

const useSignUp = () => {
  const router = useRouter()
  const handleSignUp = async (
    values: TFormValues,
    resetForm: () => void,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    const userData: TCreateUser = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    };
    const data = await signUpAction(userData);
    if (data.success) {
      toast.success("User created successfully");
      router.push('sign-in')
    }
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
