export default function HowItWorks({ onContinue }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FAF7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#355E3B",
            marginBottom: "15px",
            fontSize: "38px",
          }}
        >
          How MindScroll Works
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "45px",
            fontSize: "18px",
          }}
        >
          Three simple steps to become more aware of your digital habits.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "180px",
              padding: "25px",
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: "40px" }}>🧠</div>

            <h3>Notice</h3>

            <p>
              Understand why you opened an app and what triggered it.
            </p>
          </div>

          <div
            style={{
              width: "180px",
              padding: "25px",
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: "40px" }}>📝</div>

            <h3>Reflect</h3>

            <p>
              Complete a quick daily check-in in just two minutes.
            </p>
          </div>

          <div
            style={{
              width: "180px",
              padding: "25px",
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: "40px" }}>🌱</div>

            <h3>Improve</h3>

            <p>
              Build healthier digital habits one small step at a time.
            </p>
          </div>
        </div>

        <button
          onClick={onContinue}
          style={{
            marginTop: "50px",
            padding: "14px 36px",
            background: "#355E3B",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}