import { useEffect } from "react";

export default function WelcomeBack({ user, onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const name =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Friend";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7FAFC",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        <img
          src="/mindscroll-logo.png"
          alt="MindScroll"
          style={{
            width: "90px",
            marginBottom: "28px",
          }}
        />

        <h1
          style={{
            color: "#355E3B",
            fontSize: "38px",
            marginBottom: "12px",
          }}
        >
          Welcome back,
        </h1>

        <h2
          style={{
            color: "#111827",
            fontSize: "32px",
            marginTop: 0,
            marginBottom: "24px",
          }}
        >
          {name} 👋
        </h2>

        <p
          style={{
            color: "#4A5C52",
            fontSize: "18px",
          }}
        >
          Preparing your dashboard...
        </p>
      </div>
    </div>
  );
}