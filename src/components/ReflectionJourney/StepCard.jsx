import { AnimatePresence, motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
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
export default function StepCard({ step, onContinue }) {
  return (
    <div className="ms-device">

      {/* Static Header */}
      <div className="device-header">

        <div>
          <p className="device-brand">
            MindScroll
          </p>

          <span className="device-subtitle">
            {step.subtitle}
          </span>
        </div>

        <div className="device-progress">
          {step.id}/4
        </div>

      </div>

      <AnimatePresence mode="wait">

        <motion.div
          key={step.id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{
            opacity: 0,
            y: -10,
            transition: {
              duration: 0.25,
            },
          }}
        >
           <div className="device-body device-body-grow">
            <motion.h2 variants={itemVariants}>
              {step.title}
            </motion.h2>

            {step.options && (

              <motion.div
                variants={containerVariants}
                className="device-options"
              >

                {step.options.map((option, index) => (

                  <motion.button
                    key={index}
                    variants={itemVariants}
                    className={
                      index === 0
                        ? "device-option active"
                        : "device-option"
                    }
                  >
                    {option}
                  </motion.button>

                ))}

              </motion.div>

            )}

            {step.insight && (

              <motion.div
                variants={itemVariants}
                className="device-insight"
              >
                {step.insight}
              </motion.div>

            )}
            {step.pattern && (
  <div className="device-pattern">

    <p className="pattern-title">
      Today's Pattern
    </p>

    {step.pattern.map((item, index) => (
      <div
        key={index}
        className="pattern-item"
      >
        <span className="pattern-dot"></span>
        {item}
      </div>
    ))}

  </div>
)}

            {step.habit && (

              <motion.div
                variants={itemVariants}
                className="device-habit"
              >
                🌱 {step.habit}
              </motion.div>

            )}

          </div>
<motion.button
  variants={itemVariants}
  className="device-button"
  onClick={onContinue}
>
            {step.button}
          </motion.button>

        </motion.div>

      </AnimatePresence>

    </div>
  );
}