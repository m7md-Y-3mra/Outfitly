import { motion } from "framer-motion";
import SignUpForm from "./signUpForm";

export function SignUpCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white dark:bg-[#2A2A30] rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm mb-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#671425] via-[#8B1D35] to-[#A82444]"></div>

      <div className="mb-8">
        <h2 className="text-[#4C1420] dark:text-white mb-2">Create Your Account</h2>
        <p className="text-[#4C1420]/60 dark:text-white/60">
          Join Outfitly and start designing your perfect wardrobe
        </p>
      </div>

      <SignUpForm />
    </motion.div>
  );
}
