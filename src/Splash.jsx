import { useEffect, useState } from "react";

export default function Splash({ onFinish }) {
  const [logoVisible, setLogoVisible] = useState(false);
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Logo appears
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 200);

    // First tagline
    const line1Timer = setTimeout(() => {
      setShowLine1(true);
    }, 800);

    // Second tagline
    const line2Timer = setTimeout(() => {
      setShowLine2(true);
    }, 1400);

    // Fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2600);

    // Navigate to Landing
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(line1Timer);
      clearTimeout(line2Timer);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "#F7FAFC",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "24px",
        textAlign: "center",
        transition: "opacity 0.5s ease",
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <img
        src="/mindscroll-logo.png"
        alt="MindScroll Logo"
        style={{
          width: "120px",
          marginBottom: "32px",
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "scale(1)" : "scale(0.92)",
          transition: "all 0.8s ease",
        }}
      />

      <h1
        style={{
          margin: 0,
          color: "#355E3B",
          fontSize: "56px",
          fontWeight: "700",
          letterSpacing: "-1.5px",
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.8s ease",
        }}
      >
        MindScroll
      </h1>

      <p
        style={{
          marginTop: "24px",
          marginBottom: 0,
          fontSize: "20px",
          fontWeight: "500",
          color: "#355E3B",
          opacity: showLine1 ? 1 : 0,
          transform: showLine1 ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.8s ease",
        }}
      >
        Every scroll tells a story.
      </p>

      <p
        style={{
          marginTop: "12px",
          fontSize: "18px",
          color: "#6B7280",
          lineHeight: "1.6",
          opacity: showLine2 ? 1 : 0,
          transform: showLine2 ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.8s ease",
        }}
      >
        Understand your digital habits.
      </p>
    </div>
  );
}