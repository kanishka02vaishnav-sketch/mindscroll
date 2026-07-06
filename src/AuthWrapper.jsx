import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import Welcome from "./Welcome";
import MindScroll from "./MindScroll";

export default function AuthWrapper() {
  const [user, setUser] = useState(undefined);

  // Read from localStorage
  const [showHome, setShowHome] = useState(
    localStorage.getItem("mindscroll_seen_welcome") === "true"
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // User logged out
      if (!currentUser) {
        localStorage.removeItem("mindscroll_seen_welcome");
        setShowHome(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading...
      </h2>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (!showHome) {
    return (
      <Welcome
        user={user}
        onContinue={() => {
          localStorage.setItem("mindscroll_seen_welcome", "true");
          setShowHome(true);
        }}
      />
    );
  }

  return <MindScroll />;
}