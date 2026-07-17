import { motion } from "framer-motion";
import "./EmotionalTransition.css";

export default function EmotionalTransition() {
  return (
    <motion.section
      className="emotion"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="emotion-glow"></div>

      <div className="emotion-container">
        <span className="emotion-eyebrow">
          A quiet moment
        </span>

        <h2 className="emotion-heading">
          Have you ever picked up your phone...
        </h2>

        <p className="emotion-question">
          ...and forgotten why?
        </p>

       <motion.div
  className="emotion-orb"
  initial={{ opacity: 0, scale: 0.92 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true, amount: 0.5 }}
  animate={{
    y: [0, -10, 0],
  }}
  transition={{
  duration: 1.2,
  delay: 0.4,
  ease: [0.22, 1, 0.36, 1],
  y: {
    duration: 6,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },
}}
  style={{ willChange: "transform" }}
>
  <div className="orb-ring"></div>
  <div className="orb-ring"></div>
  <div className="orb-ring"></div>

  <motion.div
    className="orb-core"
    animate={{
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</motion.div>
      </div>
    </motion.section>
  );
}