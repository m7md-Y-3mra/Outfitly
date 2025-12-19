import type { Metadata } from "next";
import SignInPage from "@/modules/auth/sign-in";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Outfitly account to access your wardrobe and outfits.",
};

const SignIn = () => {
  return <SignInPage />;
};

export default SignIn;
