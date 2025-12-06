"use client";
import MotionField from "@/components/motioned-input/motionedInput";
import { Form, FormikProvider } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import useSignUp from "../hook/useSignUp";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/custom-button";

const SignUpForm = () => {
  const router = useRouter();
  const { formik } = useSignUp();

  const disabled = useMemo(() => {
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

        <CustomButton
          type="submit"
          loadingText=""
          disabled={disabled}
          variant="motion"
          loading={formik.isSubmitting}
          size="md"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#671425] to-[#8B1D35] hover:from-[#6A1526] hover:to-[#9A1E3A] text-white shadow-lg shadow-[#671425]/30 hover:shadow-xl hover:shadow-[#671425]/40 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Sign Up</span>
        </CustomButton>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center pt-4"
        >
          <div className="flex items-center justify-center gap-2 text-sm">
            <p className="text-[var(--outfitly-text-primary)]/60">Already have an account?</p>
            <CustomButton
              type="button"
              variant="link"
              className="!p-0 m-0 cursor-pointer text-[var(--outfitly-primary)] hover:text-[var(--outfitly-primary-hover)] dark:hover:text-[var(--outfitly-primary-active)] transition-colors duration-300"
            >
              Sign In
            </CustomButton>
          </div>
        </motion.div>
      </Form>
    </FormikProvider>
  );
};

export default SignUpForm;
