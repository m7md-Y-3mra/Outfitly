'use client';
import MotionField from '@/components/motioned-input/motionedInput'
import { Form, FormikProvider } from 'formik'
import { motion } from 'framer-motion'
import useSignIn from '../hook/useSignIn';
import { Mail, Lock } from 'lucide-react';

const SignInForm = () => {
    const {formik} = useSignIn();
  return (
    <FormikProvider value={formik}>
        <Form className="space-y-6">
            {/* Email Input */}
            <MotionField
                name='email'
                isPassword={false}
                label='Email'
                placeholder='you@example.com'
                icon={<Mail size={18} />}
            />

            {/* Password Input */}
            <MotionField
                name='password'
                isPassword={true}
                label='Password'
                placeholder='••••••••'
                icon={<Lock size={18} />}
            />

            {/* Forgot Password Link */}
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
                Forgot Password?
            </button>
            </motion.div>
        <motion.button
          type="submit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#671425] to-[#8B1D35] hover:from-[#6A1526] hover:to-[#9A1E3A] text-white shadow-lg shadow-[#671425]/30 hover:shadow-xl hover:shadow-[#671425]/40 transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">Sign In</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
        </Form>  
    </FormikProvider>
  )
}

export default SignInForm