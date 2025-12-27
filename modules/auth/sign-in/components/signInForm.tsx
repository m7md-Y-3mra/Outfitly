"use client";
import MotionField from "@/components/motioned-input/motionedInput";
import { Form, FormikProvider } from "formik";
import { motion } from "framer-motion";
import useSignIn from "../hook/useSignIn";
import { Mail, Lock } from "lucide-react";
import CustomButton from "@/components/custom-button";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

const SignInForm = () => {
  const { formik } = useSignIn();
  const t = useTranslations("Auth.signIn");

  const disabled = useMemo(() => {
    const { email, password } = formik.values;
    return !email.trim() || !password.trim() || formik.isSubmitting;
  }, [formik]);

  return (
    <FormikProvider value={formik}>
      <Form className="space-y-6">
        {/* Email Input */}
        <MotionField
          name="email"
          isPassword={false}
          label={t("email")}
          placeholder={t("emailPlaceholder")}
          icon={<Mail size={18} />}
        />

        {/* Password Input */}
        <MotionField
          name="password"
          isPassword={true}
          label={t("password")}
          placeholder={t("passwordPlaceholder")}
          icon={<Lock size={18} />}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-right"
        >
          <button
            type="button"
            className="text-[#671425] dark:text-[#8B1D35] hover:text-[#8B1D35] dark:hover:text-[#A82444] transition-colors duration-300"
          >
            {t("forgotPassword")}
          </button>
        </motion.div>

        <CustomButton
          type="submit"
          loadingText=""
          variant="motion"
          loading={formik.isSubmitting}
          size="md"
          disabled={disabled}
          className="cursor-pointer w-full py-4 rounded-xl bg-gradient-to-r from-[#671425] to-[#8B1D35] hover:from-[#6A1526] hover:to-[#9A1E3A] text-white shadow-lg shadow-[#671425]/30 hover:shadow-xl hover:shadow-[#671425]/40 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">{t("submitButton")}</span>
        </CustomButton>
      </Form>
    </FormikProvider>
  );
};

export default SignInForm;
