import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

export default function Signup({ onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const signup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
     const userCredential = await createUserWithEmailAndPassword(
  auth,
  email,
  password
);

await updateProfile(userCredential.user, {
  displayName: name.trim(),
});

await userCredential.user.reload();

setSuccess("✅ Account created successfully!");

window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

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
        onSubmit={signup}
        style={{
          background: "#FFFFFF",
          padding: "48px 42px",
          borderRadius: "24px",
          width: "440px",
          boxShadow: "0 18px 45px rgba(53, 94, 59, 0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "700",
            color: "#355E3B",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            color: "#4A5C52",
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "16px",
          }}
        >
          Start your mindful digital journey.
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

{/* Full Name */}
<input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    marginBottom: "16px",
    borderRadius: "12px",
    border: "1px solid #D1D5DB",
    background: "#FFFFFF",
    color: "#111827",
    caretColor: "#355E3B",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
  }}
  required
/>

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
            background: "#FFFFFF",
            color: "#111827",
            caretColor: "#355E3B",
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
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 70px 14px 14px",
              borderRadius: "12px",
              border: "1px solid #D1D5DB",
              background: "#FFFFFF",
              color: "#111827",
              caretColor: "#355E3B",
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
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "#355E3B",
            color: "#FFFFFF",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Create Account
        </button>

        <button
          type="button"
          onClick={onBack}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "16px",
            borderRadius: "12px",
            border: "1.5px solid #355E3B",
            background: "#FFFFFF",
            color: "#355E3B",
            fontWeight: "600",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}