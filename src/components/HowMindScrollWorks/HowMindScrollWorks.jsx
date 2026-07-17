import "./HowMindScrollWorks.css";
import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Heart,
  Sparkles,
  Coffee,
  BookOpen,
  Repeat,
} from "lucide-react";
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 42,
    scale: 0.985,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.28,
      delayChildren: 0.25,
    },
  },
};
const fadeItem = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
const dashboardItem = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
const fadeText = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function CountUp({ value }) {
  const count = useMotionValue(0);

  const rounded = useTransform(count, (latest) =>
    Math.round(latest)
  );

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.2,
      ease: "easeOut",
    });

    return controls.stop;
  }, [count, value]);

  return (
    <motion.span
      style={{
        display: "inline-block",
        fontSize: "inherit",
        fontWeight: "inherit",
        lineHeight: "inherit",
        color: "inherit",
      }}
    >
      {rounded}
    </motion.span>
  );
}

export default function HowMindScrollWorks() {
  return (
    <section id="how-it-works" className="works">
      <div className="works-container">

        {/* Header */}

        <div className="works-header">
          <span className="works-eyebrow">
            From Reflection to Understanding
          </span>

          <h2>
            Every honest reflection becomes
            <br />
            part of a bigger picture.
          </h2>

          <p>
            Every reflection is a small moment of awareness.
            Over time, MindScroll gently connects those moments
            to help you better understand your relationship with technology.
          </p>
        </div>

        {/* Story Flow */}

        <div className="story-flow">

        {/* Stage 1 */}

<motion.div
  className="story-card"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>

 <span className="story-label">
  A SMALL MOMENT
</span>
<motion.h3 variants={fadeText}>
  You Pause
</motion.h3>

<p className="story-intro">
  Every habit begins with a moment we rarely notice.
</p>

<p className="story-description">
  What brought you here—right now?
</p>
 <motion.div
  className="choice-grid"
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
    <motion.div
      className="choice-chip"
      variants={fadeItem}
    >
      <Heart size={18} strokeWidth={2} />
      <span>Connect with someone</span>
    </motion.div>

    <motion.div
      className="choice-chip active"
      variants={fadeItem}
    >
      <Sparkles size={18} strokeWidth={2} />
      <span>See what's new</span>
    </motion.div>

    <motion.div
      className="choice-chip"
      variants={fadeItem}
    >
      <Coffee size={18} strokeWidth={2} />
      <span>Escape for a moment</span>
    </motion.div>

    <motion.div
      className="choice-chip"
      variants={fadeItem}
    >
      <BookOpen size={18} strokeWidth={2} />
      <span>Learn something new</span>
    </motion.div>

    <motion.div
      className="choice-chip"
      variants={fadeItem}
    >
      <Repeat size={18} strokeWidth={2} />
      <span>Opened without thinking</span>
    </motion.div>

  </motion.div>

</motion.div>

{/* Stage 2 */}

<motion.div
  className="story-card"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>

 <span className="story-label">
  PATTERNS EMERGE
</span>

<h3>
  Small moments become something meaningful.
</h3>

<p className="story-description">
  One reflection doesn't reveal much.
  <br />
  <br />
  But together, small moments begin to form patterns that are surprisingly consistent.
  <br />
  <br />
  MindScroll helps you notice them with clarity, so you can better understand your relationship with technology.
</p>
  <motion.div
  className="pattern-grid"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
>

  <motion.div variants={fadeItem}>
  💭 Intention
</motion.div>

<motion.div variants={fadeItem}>
  🕒 Time of day
</motion.div>

    <motion.div variants={fadeItem}>
  📱 Technology used
</motion.div>

    <motion.div variants={fadeItem}>
  🌱 How you felt afterwards
</motion.div>

  </motion.div>

</motion.div>
<motion.p
  className="story-bridge"
  initial={{ opacity: 0, y: 14 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.8,
    delay: 0.3,
    ease: [0.22, 1, 0.36, 1],
  }}
>
  Patterns begin to appear...
</motion.p>

          

{/* Stage 3 */}

<motion.div
  className="story-card result-card"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  transition={{
    delay: 0.45,
    duration: 0.9,
    ease: "easeOut",
  }}
>

 <span className="story-label">
INSIGHT
</span>

<h3>
The story starts making sense.
</h3>

  <p className="story-description">
  After just a few honest reflections, MindScroll begins surfacing gentle insights that help you understand your relationship with technology—not judge it.
</p>
  <motion.div
  className="dashboard-mini"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
>
<motion.div
  className="mini-card"
  variants={dashboardItem}
>
  <span>Habit Score</span>

  <strong>
    <CountUp value={82} />
  </strong>

 <p className="mini-card-note">
  Based on your last 7 reflections
</p>

</motion.div>
  <motion.div
  className="mini-card"
  variants={fadeItem}
  transition={{
    delay: 0.35,
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1],
  }}
>
    <span>Weekly Insight</span>
<p className="mini-card-note">
  You often begin by checking what's new.
  <br />
  <br />
  Your evening sessions are less likely to leave you feeling refreshed.
</p>
 
  </motion.div>

   <motion.div
  className="mini-card"
  variants={fadeItem}
  transition={{
    delay: 0.55,
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1],
  }}
>
  <span>Reflection Streak</span>

  <strong>7 Reflections</strong>

  <p className="mini-card-note">
  7 days of honest check-ins
</p>
</motion.div>

</motion.div> {/* dashboard-mini */}
<p className="dashboard-note">
  Insights become more meaningful as you reflect.
</p>

</motion.div> {/* Stage 3 story-card */}

</div> {/* story-flow */}

</div> {/* works-container */}

</section>
);
}