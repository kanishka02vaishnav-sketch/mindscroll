import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar({ onGetStarted }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
       <a href="#top" className="logo">
  <img
    src="/mindscroll-logo.png"
    alt="MindScroll Logo"
    className="navbar-logo"
  />

  <span>MindScroll</span>
</a>
<nav className="nav-links">
  <a href="#product">Product</a>
  <a href="#research">Research</a>
</nav>

        <div className="nav-actions">
          <button className="sign-in-btn">
  Log In
</button>

          <button
  className="get-started-btn"
  onClick={onGetStarted}
>
  Open MindScroll
</button>
        </div>
      </div>
    </header>
  );
}