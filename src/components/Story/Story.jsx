import { motion } from "framer-motion";
import "./Story.css";
import { Eye, NotebookPen, Sprout } from "lucide-react";

export default function Story() {
  return (
    <section className="story">

      <div className="story-container">

        <div className="story-header">

 <motion.div
  className="emotion-stage"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9 }}
  viewport={{ once: true }}
>

  <motion.p
    className="emotion-label"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    viewport={{ once: true }}
  >
    A quiet moment
  </motion.p>

  <motion.h2
    className="emotion-title"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.35 }}
    viewport={{ once: true }}
  >
    Have you ever opened your phone...
  </motion.h2>

  <motion.p
    className="emotion-subtitle"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.65 }}
    viewport={{ once: true }}
  >
    ...and forgotten why?
  </motion.p>

</motion.div>
<div className="emotion-breath">

  <div className="breath-circle">

    <div className="breath-core"></div>

  </div>

</div>

</div>
<div className="story-flow-wrapper">

  <div className="story-flow">

  <div className="flow-card">

   <div className="flow-icon">
  <Eye size={30} />
</div>

    <h3>Notice</h3>

    <p>
      Pause before opening an app.
    </p>

  </div>

  <div className="flow-connector"></div>
  <div className="flow-card">

  <div className="flow-icon">
    <NotebookPen size={30} />
  </div>

  <h3>Reflect</h3>

  <p>
    Understand what you were feeling.
  </p>

</div>
  <div className="flow-connector"></div>

  <div className="flow-card">

    <div className="flow-icon">
  <Sprout size={30} />
</div>

    <h3>Grow</h3>

    <p>
      Build healthier habits over time.
    </p>

  </div>

</div>

</div>

<p className="story-quote">
  Small moments of awareness create lasting change.
</p>

      </div>

    </section>
  );
}