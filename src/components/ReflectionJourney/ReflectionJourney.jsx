import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./ReflectionJourney.css";
import StepCard from "./StepCard";
import steps from "./steps";

export default function ReflectionJourney() {
 const [currentStep, setCurrentStep] = useState(0);
const [userInteracted, setUserInteracted] = useState(false);

const nextStep = () => {
  setCurrentStep((prev) => (prev + 1) % steps.length);
};

useEffect(() => {
  if (userInteracted) return;

  const duration =
    currentStep === 0
      ? 6500   // Step 1 (more content to read)
      : 5000;  // Steps 2–4

  const timer = setTimeout(() => {
    nextStep();
  }, duration);

  return () => clearTimeout(timer);
}, [currentStep, userInteracted]);
  return (
    <motion.section
      className="journey"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="journey-showcase">

 <motion.div
  animate={{
    y: [0, -8, 0],
  }}
  transition={{
    duration: 5.5,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  }}
  style={{
    willChange: "transform",
  }}
>
    <StepCard
      step={steps[currentStep]}
      onContinue={() => {
        setUserInteracted(true);
        nextStep();
      }}
    />
  </motion.div>

</div>

      <div className="journey-progress">
        <div className="progress-line"></div>

        {steps.map((step, index) => (
          <div
            key={step.id}
            className={
              index === currentStep
                ? "progress-step active"
                : "progress-step"
            }
          >
            <div className="progress-dot"></div>

            <span>
              {step.id === 1 && "Notice"}
              {step.id === 2 && "Reflect"}
              {step.id === 3 && "Insight"}
              {step.id === 4 && "Grow"}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}