import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import Signup from "./Signup";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

const login = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");
    setSuccess("");

    await signInWithEmailAndPassword(auth, email, password);

    setSuccess("✅ Login successful!");
  } catch (error) {
    setSuccess("");

    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      setError("❌ Incorrect email or password.");
    } else {
      setError(error.message);
    }
  } finally {
    setLoading(false);
  }
};

const forgotPassword = async () => {
  if (!email) {
    setError("❌ Please enter your email first.");
    setSuccess("");
    return;
  }

 try {
  setResetLoading(true);

  await sendPasswordResetEmail(auth, email);
    setError("");
    setSuccess("✅ Password reset email sent. Check your inbox.");
    setTimeout(() => {
  setSuccess("");
}, 4000);
    } catch (error) {
    setSuccess("");

    if (error.code === "auth/user-not-found") {
      setError("❌ No account found with this email.");
    } else if (error.code === "auth/invalid-email") {
      setError("❌ Please enter a valid email.");
    } else {
      setError(error.message);
    }
  } finally {
    setResetLoading(false);
  }
};

  if (showSignup) {
  return <Signup onBack={() => setShowSignup(false)} />;
}

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#F7FAFC",
      }}
    >
      <form
        onSubmit={login}
        style={{
          background: "#FFFFFF",
          padding: "48px 42px",
          borderRadius: "24px",
          width: "440px",
          boxShadow: "0 18px 45px rgba(53, 94, 59, 0.08)",
        }}
      >
          {/* LOGO */}
  <img
    src="/mindscroll-logo.png"
    alt="logo"
    style={{
      width: "95px",
      height: "95px",
      display: "block",
      margin: "0 auto 10px",
    }}
  />
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "700",
            color: "#355E3B",
            textAlign: "center",
            marginBottom: "12px",
            letterSpacing: "0.6px",
          }}
        >
          MindScroll
        </h1>
       
        <p
          style={{
            color: "#4A5C52",
            textAlign: "center",
            marginBottom: "36px",
            lineHeight: "1.7",
            fontSize: "16px",
            fontWeight: "500",
            maxWidth: "300px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Technology isn't the enemy.
          <br />
          Unconscious habits are.
        </p>
        {error && (
  <p
    style={{
      color: "#B91C1C",
      background: "#FEF2F2",
      border: "1px solid #FECACA",
      padding: "12px",
      borderRadius: "10px",
      marginBottom: "16px",
      textAlign: "center",
      fontSize: "14px",
    }}
  >
    {error}
  </p>
)}

{success && (
  <p
    style={{
      color: "#166534",
      background: "#F0FDF4",
      border: "1px solid #BBF7D0",
      padding: "12px",
      borderRadius: "10px",
      marginBottom: "16px",
      textAlign: "center",
      fontSize: "14px",
    }}
  >
    {success}
  </p>
)}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "16px",
            borderRadius: "12px",
            border: "1px solid #D1D5DB",
            background: "#F9FAFB",
            color: "#355E3B",
            fontSize: "15px",
            boxSizing: "border-box",
            outline: "none",
          }}
          required
        />

       <div
  style={{
    position: "relative",
    marginBottom: "20px",
  }}
>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
  onChange={(e) => {
  setPassword(e.target.value);
  setError("");
  setSuccess("");
}}
    style={{
      width: "100%",
      padding: "14px 70px 14px 14px",
      borderRadius: "12px",
      border: "1px solid #D1D5DB",
      background: "#F9FAFB",
      color: "#355E3B",
      fontSize: "15px",
      boxSizing: "border-box",
      outline: "none",
    }}
    required
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      color: "#355E3B",
      fontWeight: "600",
      cursor: "pointer",
    }}
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>
<p
  onClick={!resetLoading ? forgotPassword : undefined}
  onMouseEnter={(e) => {
    if (!resetLoading) {
      e.target.style.textDecoration = "underline";
      e.target.style.color = "#2F5134";
    }
  }}
  onMouseLeave={(e) => {
    e.target.style.textDecoration = "none";
    e.target.style.color = "#355E3B";
  }}
  style={{
    textAlign: "right",
    marginTop: "-10px",
    marginBottom: "18px",
    color: "#355E3B",
    fontSize: "14px",
    cursor: resetLoading ? "not-allowed" : "pointer",
    fontWeight: "500",
    opacity: resetLoading ? 0.7 : 1,
    userSelect: "none",
  }}
>
  {resetLoading ? "Sending..." : "Forgot Password?"}
</p>

      <button
  type="submit"
  disabled={loading}
  onMouseEnter={(e) => {
    e.target.style.background = "#FFFFFF";
    e.target.style.color = "#355E3B";
    e.target.style.border = "1.5px solid #355E3B";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "#355E3B";
    e.target.style.color = "#FFFFFF";
    e.target.style.border = "none";
  }}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "#355E3B",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: "15px",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.7 : 1,
    transition: "0.25s ease",
  }}
>
  {loading ? "Logging in..." : "Login"}
</button>
   
        <p
          style={{
            marginTop: "22px",
            marginBottom: "10px",
            textAlign: "center",
            color: "#5D6F66",
            fontSize: "14px",
          }}
        >
          New to MindScroll?
        </p>

       <button
  type="button"
  onClick={() => setShowSignup(true)}
  onMouseEnter={(e) => {
    e.target.style.background = "#355E3B";
    e.target.style.color = "#FFFFFF";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "#FFFFFF";
    e.target.style.color = "#355E3B";
  }}
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1.5px solid #355E3B",
    background: "#FFFFFF",
    color: "#355E3B",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.25s ease",
  }}
>
          Create Account
        </button>
      </form>
    </div>
  );
}