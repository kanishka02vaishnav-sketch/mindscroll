import { useState } from "react";
import Splash from "./Splash";
import Welcome from "./Welcome";
import AuthWrapper from "./AuthWrapper";

export default function App() {
  const [screen, setScreen] = useState("splash");

  if (screen === "splash") {
    return <Splash onFinish={() => setScreen("welcome")} />;
  }

  if (screen === "welcome") {
    return <Welcome onGetStarted={() => setScreen("auth")} />;
  }

  return <AuthWrapper />;
}