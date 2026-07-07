import { useEffect, useState } from "react";

const title = "MindScroll";

export default function Splash({ onFinish }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setLogoVisible(true);

    // Start typing after logo appears
    const startTyping = setTimeout(() => {
      let index = 0;

      const typing = setInterval(() => {
        setDisplayedText(title.slice(0, index + 1));
        index++;

        if (index === title.length) {
          clearInterval(typing);

          // First tagline
          setTimeout(() => {
            setShowLine1(true);
          }, 1000);

          // Second tagline
          setTimeout(() => {
            setShowLine2(true);
          }, 2500);

          // Fade out
          setTimeout(() => {
            setFadeOut(true);
          }, 5000);

          // Go to Welcome
          setTimeout(() => {
            onFinish();
          }, 5600);
        }
      }, 220);
    }, 500);

    return () => clearTimeout(startTyping);
  }, [onFinish]);

  return (
    <div
      style={{
        height: "100vh",
        background: "#F7FAFC",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        transition: "opacity 0.6s ease",
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <img
        src="/mindscroll-logo.png"
        alt="MindScroll"
        style={{
          width: "100px",
          marginBottom: "28px",
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease",
        }}
      />

      <h1
        style={{
          color: "#355E3B",
          fontSize: "44px",
          fontWeight: "700",
          margin: 0,
          minHeight: "56px",
          letterSpacing: "-1px",
        }}
      >
        {displayedText}
      </h1>

      <p
        style={{
          marginTop: "24px",
          fontSize: "20px",
          color: "#355E3B",
          opacity: showLine1 ? 1 : 0,
          transform: showLine1 ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.8s ease",
          fontWeight: "500",
        }}
      >
        Every scroll tells a story.
      </p>

      <p
        style={{
          marginTop: "12px",
          fontSize: "18px",
          color: "#4A5C52",
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