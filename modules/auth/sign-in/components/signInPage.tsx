'use client';
import { motion } from "framer-motion";
import SignInCard from "./signInCard";
import { Logo } from "@/components/logo/logo";
import { SocialLoginButtons } from "./socialSignIn";


export function SignInPage() {
  
  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-[#FAF1ED] via-[#F2E8E3] to-[#FAF1ED] dark:from-[#1C1C20] dark:via-[#14141A] dark:to-[#1C1C20] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#671425]/10 to-[#8B1D35]/10 dark:from-[#671425]/20 dark:to-[#8B1D35]/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-[#8B1D35]/10 to-[#A82444]/10 dark:from-[#8B1D35]/20 dark:to-[#A82444]/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo/Brand */}
          <div className="text-center mt-8">
            <Logo size="sm" animated={true} linkTo="/" />
          </div>

          {/* Login Card */}
          <SignInCard/>

          {/* Social Login */}
          {/* <SocialLoginButtons onSocialLogin={handleSocialLogin} /> */}

          <SocialLoginButtons onSocialLogin={() => { console.log("Social Login clicked") }} />
          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-[#4C1420]/60 dark:text-white/60">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => console.log("Sign Up clicked")}
                className="text-[#671425] dark:text-[#8B1D35] hover:text-[#8B1D35] dark:hover:text-[#A82444] transition-colors duration-300"
              >
                Sign Up
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
