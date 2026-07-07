import { ShieldCheck, Brain, Leaf } from "lucide-react";

export default function Welcome({ onGetStarted }) {
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
          width: "100%",
          maxWidth: "700px",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <img
          src="/mindscroll-logo.png"
          alt="MindScroll"
          style={{
            width: "100px",
            marginBottom: "28px",
          }}
        />

        {/* App Name */}
        <h1
          style={{
            fontSize: "44px",
            color: "#355E3B",
            fontWeight: "700",
            margin: 0,
            marginBottom: "16px",
          }}
        >
          MindScroll
        </h1>

        {/* Headline */}
        <p
          style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "18px",
          }}
        >
          Reflect. Understand. Improve.
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "18px",
            color: "#4A5C52",
            lineHeight: "1.8",
            maxWidth: "560px",
            margin: "0 auto 40px auto",
          }}
        >
          Build healthier digital habits through private reflection,
          mindful awareness, and research-backed insights that help you
          make intentional choices every day.
        </p>

        {/* Button */}
        <button
          onClick={onGetStarted}
          style={{
            background: "#355E3B",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "12px",
            padding: "16px 36px",
            fontSize: "17px",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "60px",
            minWidth: "220px",
          }}
        >
          Get Started
        </button>

        {/* Feature Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              padding: "28px",
              boxShadow: "0 12px 30px rgba(53,94,59,0.08)",
              border: "1px solid #E5E7EB",
            }}
          >
            <ShieldCheck
              size={40}
              color="#355E3B"
              strokeWidth={2}
              style={{ marginBottom: "18px" }}
            />

            <h3
              style={{
                color: "#111827",
                fontSize: "20px",
                marginBottom: "12px",
              }}
            >
              Private by Design
            </h3>

            <p
              style={{
                color: "#6B7280",
                lineHeight: "1.7",
                fontSize: "15px",
                margin: 0,
              }}
            >
              Your reflections stay yours.
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              padding: "28px",
              boxShadow: "0 12px 30px rgba(53,94,59,0.08)",
              border: "1px solid #E5E7EB",
            }}
          >
            <Brain
              size={40}
              color="#355E3B"
              strokeWidth={2}
              style={{ marginBottom: "18px" }}
            />

            <h3
              style={{
                color: "#111827",
                fontSize: "20px",
                marginBottom: "12px",
              }}
            >
              Research-backed
            </h3>

            <p
              style={{
                color: "#6B7280",
                lineHeight: "1.7",
                fontSize: "15px",
                margin: 0,
              }}
            >
              Built on evidence-based digital wellbeing.
            </p>
          </div>

          {/* Card 3 */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              padding: "28px",
              boxShadow: "0 12px 30px rgba(53,94,59,0.08)",
              border: "1px solid #E5E7EB",
            }}
          >
            <Leaf
              size={40}
              color="#355E3B"
              strokeWidth={2}
              style={{ marginBottom: "18px" }}
            />

            <h3
              style={{
                color: "#111827",
                fontSize: "20px",
                marginBottom: "12px",
              }}
            >
              Build Better Habits
            </h3>

            <p
              style={{
                color: "#6B7280",
                lineHeight: "1.7",
                fontSize: "15px",
                margin: 0,
              }}
            >
              Small changes that last.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}