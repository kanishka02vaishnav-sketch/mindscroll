export default function Welcome({ user, onContinue }) {
   const userName =
  user?.displayName ||
  user?.email?.split("@")[0] ||
  "Friend";
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
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <img
          src="/mindscroll-logo.png"
          alt="MindScroll"
          style={{
            width: "90px",
            marginBottom: "30px",
          }}
        />
<h1
  style={{
    fontSize: "38px",
    color: "#355E3B",
    lineHeight: "1.3",
    marginBottom: "8px",
    fontWeight: "700",
  }}
>
  Welcome, {userName} 👋
</h1>

<h2
  style={{
    fontSize: "28px",
    color: "#355E3B",
    fontWeight: "500",
    marginTop: "0",
    marginBottom: "25px",
  }}
>
  to MindScroll
</h2>
        <p
          style={{
            fontSize: "24px",
            color: "#444",
            marginBottom: "20px",
          }}
        >
          Understand your digital habits.
        </p>

        <p
          style={{
            fontSize: "18px",
            color: "#666",
            lineHeight: "1.7",
            marginBottom: "50px",
          }}
        >
          A private space to reflect on why you use apps,
          how they affect your attention,
          and how to build healthier habits.
        </p>

        <button
          onClick={onContinue}
          style={{
            padding: "14px 40px",
            borderRadius: "12px",
            border: "none",
            background: "#355E3B",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}