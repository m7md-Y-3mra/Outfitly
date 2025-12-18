"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Dot = { id: number; top: string; left: string };

function makeDots(count = 20): Dot[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  }));
}

export default function AnimatedBg() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDots(makeDots(20));
  }, []);

  if (dots.length === 0) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            top: d.top,
            left: d.left,
            background:
              "linear-gradient(135deg, var(--outfitly-gradient-start) 0%, var(--outfitly-gradient-mid) 100%)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + (d.id % 5),
            repeat: Infinity,
            delay: (d.id % 5) * 0.2,
          }}
        />
      ))}
    </div>
  );
}
