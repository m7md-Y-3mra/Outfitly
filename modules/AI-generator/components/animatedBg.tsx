import { motion } from 'framer-motion'
import { DOTS_STATES } from '../constants'

const AnimatedBg = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
        {DOTS_STATES.map((d) => (
          <motion.div
            key={d.id}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500"
            style={{
              top: d.top,
              left: d.left,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: d.duration,
              delay: d.delay,
              repeat: Infinity,
            }}
          />
        ))}
    </div>
  )
}

export default AnimatedBg