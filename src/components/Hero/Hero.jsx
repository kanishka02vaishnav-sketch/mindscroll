import "./Hero.css";
import HeroBrowser from "../HeroBrowser/HeroBrowser";
import { motion } from "framer-motion";

import {
  FlaskConical,
  Lock,
  Leaf
} from "lucide-react";

export default function Hero({ onGetStarted }) {
  return (
    <section className="hero">

      <div className="section-container hero-container">
        

        {/* LEFT SIDE */}
    <motion.div
  className="hero-left"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
          
          <h1 className="hero-title">
            Understand your digital habits.
          </h1>

          <p className="hero-subtitle">
            Every scroll tells a story.
          </p>

         <p className="hero-description">
  MindScroll helps you understand why you reach for technology through private reflection and research-backed insights, so you can build a healthier relationship with your digital habits.
</p>

         <div className="hero-points">

  <span>
    <FlaskConical size={18} />
    Research-informed insights
  </span>

  <span>
    <Lock size={18} />
    Your reflections stay private
  </span>

  <span>
    <Leaf size={18} />
    Built for mindful technology use
  </span>

</div>

          <div className="hero-buttons">

  <button
    className="primary-btn"
    onClick={onGetStarted}
  >
    Start Your Reflection
  </button>

</div>
<div className="hero-bridge">

  <span className="bridge-line"></span>

  <p>
    Every habit begins with a moment.
  </p>

</div>

        </motion.div>


        {/* RIGHT SIDE */}
        <motion.div
  className="hero-right"
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.9,
    delay: 0.25
  }}
>

  <HeroBrowser />

</motion.div>


      </div>

    </section>
  );
}