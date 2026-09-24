import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-page">

            {/* Navbar */}
            <nav className="landing-navbar">

                <div className="logo">
                    <span>♻</span>
                    ReSource
                </div>

                <div className="nav-links">
                    <button
                        className="nav-login"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                    <button
                        className="nav-register"
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                    </button>
                </div>

            </nav>


            {/* Hero */}
            <section className="hero-section">

                <div className="hero-content">

                    <div className="hero-badge">
                        ♻ Sustainable Resource Sharing
                    </div>

                    <h1>
                        Resources should be
                        <span> reused, not wasted.</span>
                    </h1>

                    <p>
                        ReSource connects people and organizations
                        with useful resources they no longer need,
                        helping them reach communities where they
                        can make a difference.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="primary-button"
                            onClick={() => navigate("/register")}
                        >
                            Get Started →
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </button>

                    </div>

                    <div className="hero-stats">

                        <div>
                            <strong>Share</strong>
                            <small>Unused resources</small>
                        </div>

                        <div>
                            <strong>Connect</strong>
                            <small>With communities</small>
                        </div>

                        <div>
                            <strong>Reuse</strong>
                            <small>Create an impact</small>
                        </div>

                    </div>

                </div>

                <div className="hero-visual">

                    <div className="visual-card main-card">

                        <div className="visual-icon">
                            ♻
                        </div>

                        <h3>Give resources a second life.</h3>

                        <p>
                            Share what you have.
                            Help someone who needs it.
                        </p>

                        <div className="resource-preview">

                            <div className="preview-icon">
                                🪑
                            </div>

                            <div>
                                <strong>Office Chairs</strong>
                                <small>Colombo · 20 available</small>
                            </div>

                            <span>Available</span>

                        </div>

                    </div>

                    <div className="floating-card top-card">
                        🤝 Community
                    </div>

                    <div className="floating-card bottom-card">
                        🌱 Less waste
                    </div>

                </div>

            </section>


            {/* Features */}
            <section className="features-section">

                <div className="section-heading">
                    <span>HOW IT WORKS</span>
                    <h2>Simple resource sharing</h2>
                    <p>
                        A simple way to connect resources with
                        people who need them.
                    </p>
                </div>

                <div className="feature-grid">

                    <div className="feature-card">
                        <div className="feature-number">01</div>
                        <h3>Share</h3>
                        <p>
                            Providers list resources that are
                            available for others to use.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-number">02</div>
                        <h3>Discover</h3>
                        <p>
                            Recipients browse available resources
                            and find what they need.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-number">03</div>
                        <h3>Connect</h3>
                        <p>
                            Recipients send requests and providers
                            manage them through their dashboard.
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default LandingPage;