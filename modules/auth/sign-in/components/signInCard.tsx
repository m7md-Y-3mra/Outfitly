"use client";
import { motion } from "framer-motion";
import SignInForm from "./signInForm";

const SignInCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white text-card-foreground rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm mb-6 relative overflow-hidden border border-border"
    >
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Welcome Text */}
      <div className="mb-8">
        <h2 className="mb-2 text-foreground">Welcome Back!</h2>
        <p className="text-muted-foreground">Sign in to continue to your wardrobe</p>
      </div>

      {/* Login Form */}
      <SignInForm />
    </motion.div>
  );
};

export default SignInCard;
