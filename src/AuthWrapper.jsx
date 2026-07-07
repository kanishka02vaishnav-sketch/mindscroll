import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import MindScroll from "./MindScroll";
import WelcomeBack from "./WelcomeBack";

export default function AuthWrapper() {
  const [user, setUser] = useState(undefined);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (currentUser) {
          await currentUser.reload();
          setUser(auth.currentUser);
        } else {
          setUser(null);
          setShowDashboard(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F7FAFC",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#355E3B",
          fontSize: "22px",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return <Login />;
  }

  // Show Welcome Back screen once after login
  if (!showDashboard) {
    return (
      <WelcomeBack
        user={user}
        onFinish={() => setShowDashboard(true)}
      />
    );
  }

  // Main App
  return <MindScroll />;
}