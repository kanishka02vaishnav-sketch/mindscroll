import "./HeroBrowser.css";

export default function HeroBrowser() {
  return (
    <div className="browser-frame">

      <div className="browser-top">

  <div className="browser-dots">
    <span></span>
    <span></span>
    <span></span>
  </div>

  <div className="browser-address">
    mindscroll.app/dashboard
  </div>

</div>

      <div className="browser-content">

       <div className="dashboard-top">

  <div>
    <span className="dashboard-label">
      Dashboard
    </span>

    <h3>
      MindScroll
    </h3>
  </div>

  <div className="profile-dot">
    👤
  </div>

</div>


        <div className="welcome-text">
  <h4>Good evening 👋</h4>
  <span>Monday, July 13</span>
</div>

<div className="score-card">

  <div className="score-ring">

    <div className="ring-circle">
      <strong>78</strong>
    </div>

    <span>Habit Score</span>

    <p className="score-change">
      ↑ +6 this week
    </p>

  </div>

</div>
<div className="progress-section">

  <div className="progress-label">
    <span>Weekly Progress</span>
    <span>80%</span>
  </div>

  <div className="progress-bar">
    <div className="progress-fill"></div>
  </div>

</div>

        <div className="reflection-card">

  <p>
    Today's Reflection
  </p>

  <h4>
    You opened Instagram during a low-energy moment.
  </h4>

  <span>
    🌱 Insight: You're most likely to open social media when your energy dips in the afternoon.
  </span>

  <p className="reflection-status">
    ✓ Reflection saved
  </p>

</div>


        <div className="dashboard-grid">

  <div>
    <span>
      Mood
    </span>

    <strong>
      Calm
    </strong>
  </div>


  <div>
    <span>
      Attention
    </span>

    <strong>
      Improving
    </strong>
  </div>

<div className="streak-card">
  <span>
    🔥 Streak
  </span>

  <strong>
    12 Days
  </strong>
</div>
</div>
            
      </div>

    </div>
  );
}