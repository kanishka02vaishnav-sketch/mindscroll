import { useState } from "react";
import Splash from "./Splash";
import LandingPage from "./pages/LandingPage";
import AuthWrapper from "./AuthWrapper";

export default function App() {
  const [screen, setScreen] = useState("splash");

  if (screen === "splash") {
    return <Splash onFinish={() => setScreen("welcome")} />;
  }

  if (screen === "welcome") {
  return <LandingPage onGetStarted={() => setScreen("auth")} />;
}
  return <AuthWrapper />;
}