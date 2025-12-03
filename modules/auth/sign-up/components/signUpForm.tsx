"use client";
import MotionField from "@/components/motioned-input/motionedInput";
import { Form, FormikProvider } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import useSignUp from "../hook/useSignUp";
import { Button } from "@/components/ui/button";

const SignUpForm = () => {
  const router = useRouter();
  const { formik } = useSignUp();

  const isButtonDisabled = useMemo(() => {
    const { fullName, email, password, confirmPassword, terms } = formik.values;

    return (
      !fullName?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !confirmPassword?.trim() ||
      !terms ||
      password !== confirmPassword ||
      formik.isSubmitting
    );
  }, [formik]);

  return (
    <FormikProvider value={formik}>
      <Form className="space-y-5">
        <MotionField name="fullName" label="Full Name" placeholder="Mona Zaqout" type="text" />

        <MotionField
          name="email"
          label="Email Address"
          placeholder="mona@example.com"
          type="email"
        />

        <MotionField
          name="password"
          label="Password"
          placeholder="••••••••"
          type="password"
          isPassword={true}
        />

        <MotionField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="••••••••"
          type="password"
          isPassword={true}
        />

        <MotionField type="checkbox" name="terms" label="Agree to Terms and Conditions" />

        <motion.button
          type="submit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          whileHover={{ scale: isButtonDisabled ? 1 : 1.02 }}
          whileTap={{ scale: isButtonDisabled ? 1 : 0.98 }}
          disabled={isButtonDisabled}
          className="cursor-pointer w-full py-4 rounded-xl bg-gradient-to-r from-[var(--outfitly-gradient-start)] to-[var(--outfitly-gradient-mid)] hover:from-[var(--outfitly-primary-hover)] hover:to-[var(--outfitly-gradient-end)] text-[var(--outfitly-text-light)] shadow-lg shadow-[var(--outfitly-shadow)] hover:shadow-xl hover:shadow-[var(--outfitly-shadow)] transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10">{formik.isSubmitting ? "Signing Up..." : "Sign Up"}</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center pt-4"
        >
          <p className="text-[var(--outfitly-text-primary)]/60">
            Already have an account?{" "}
            <Button
              type="button"
              variant="link"
              onClick={() => router.push("sign-in")}
              className="p-0 text-[var(--outfitly-primary)] hover:text-[var(--outfitly-primary-hover)] dark:hover:text-[var(--outfitly-primary-active)] transition-colors duration-300"
            >
              Sign In
            </Button>
          </p>
        </motion.div>
      </Form>
    </FormikProvider>
  );
};

export default SignUpForm;
