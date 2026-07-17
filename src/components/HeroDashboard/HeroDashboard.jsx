import "./HeroDashboard.css";

export default function HeroDashboard() {
  return (
    <div className="hero-dashboard">

      {/* Reflection Card */}

      <div className="dashboard-card reflection-card">

        <span className="card-label">
          Today's Reflection
        </span>

        <h3>
          Why did you open YouTube?
        </h3>

        <div className="reflection-options">

          <button>📚 Learn</button>

          <button>😌 Relax</button>

          <button>🤖 Habit</button>

          <button>💬 Connection</button>

        </div>

        <button className="continue-btn">
          Continue →
        </button>

      </div>

      {/* Insight */}

      <div className="dashboard-card">

        <span className="card-label">
          Today's Insight
        </span>

        <p>
          You often open YouTube after classes.
        </p>

      </div>

      {/* Experiment */}

      <div className="dashboard-card">

        <span className="card-label">
          Small Experiment
        </span>

        <p>
          Wait 10 minutes before opening YouTube tomorrow and notice how you feel.
        </p>

      </div>

      {/* Score */}

      <div className="dashboard-card">

        <span className="card-label">
          Awareness Score
        </span>

        <h2>72%</h2>

        <div className="progress">

          <div className="progress-fill"></div>

        </div>

      </div>

    </div>
  );
}