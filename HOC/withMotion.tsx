import { motion } from "framer-motion";
import React from "react";

const withMotion = <P extends object>(Component: React.ComponentType<P>) => {
  const MotionComponent: React.FC<P> = (props: P) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      className="space-y-2"
    >
      <Component {...props} />
    </motion.div>
  );

  const componentName = Component.displayName || Component.name || "Component";
  MotionComponent.displayName = `withMotion(${componentName})`;

  return MotionComponent;
};

export default withMotion;
