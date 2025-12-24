import type { Metadata } from "next";
import SignInPage from "@/modules/auth/sign-in";
import { Suspense } from "react";
import Loading from "@/components/loading";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Outfitly account to access your wardrobe and outfits.",
};

const SignIn = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SignInPage />
    </Suspense>
  );
};

export default SignIn;
