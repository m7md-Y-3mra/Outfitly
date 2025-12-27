import type { Metadata } from "next";
import SignUpPage from "@/modules/auth/sign-up";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Outfitly account and start organizing your wardrobe today.",
};

const SignUp = () => {
  return <SignUpPage />;
};

export default SignUp;
