import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import EmotionalTransition from "../components/EmotionalTransition/EmotionalTransition";
import ReflectionJourney from "../components/ReflectionJourney/ReflectionJourney";
import BackgroundCanvas from "../components/BackgroundCanvas/BackgroundCanvas";
import HowMindScrollWorks from "../components/HowMindScrollWorks/HowMindScrollWorks";
import "./LandingPage.css";


export default function LandingPage({ onGetStarted }) {
  return (
    <>
    <BackgroundCanvas />
      <Navbar onGetStarted={onGetStarted} />

      <main className="landing-page">
        <Hero onGetStarted={onGetStarted} />

        <EmotionalTransition />

        <ReflectionJourney />
        <HowMindScrollWorks />
      </main>
    </>
  );
}