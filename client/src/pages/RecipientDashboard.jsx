import { useNavigate } from "react-router-dom";

function RecipientDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="dashboard-page">

            {/* Sidebar */}
            <aside className="dashboard-sidebar">

                <div className="dashboard-logo">
                    <span>♻</span>
                    ReSource
                </div>

                <nav className="sidebar-nav">

                    <button className="sidebar-link active">
                        <span>⌂</span>
                        Dashboard
                    </button>

                    <button
                        className="sidebar-link"
                        onClick={() =>
                            navigate("/resources")
                        }
                    >
                        <span>⌕</span>
                        Browse Resources
                    </button>

                    <button
                        className="sidebar-link"
                        onClick={() =>
                            navigate("/recipient/requests")
                        }
                    >
                        <span>☷</span>
                        My Requests
                    </button>

                </nav>

                <button
                    className="sidebar-logout"
                    onClick={handleLogout}
                >
                    <span>↪</span>
                    Logout
                </button>

            </aside>


            {/* Main Content */}
            <main className="dashboard-main">

                {/* Header */}
                <header className="dashboard-header">

                    <div>
                        <p className="dashboard-label">
                            RECIPIENT DASHBOARD
                        </p>

                        <h1>Welcome back 👋</h1>

                        <p>
                            Find useful resources and connect
                            with people in your community.
                        </p>
                    </div>

                    <button
                        className="dashboard-primary-button"
                        onClick={() =>
                            navigate("/resources")
                        }
                    >
                        Browse Resources
                    </button>

                </header>


                {/* Action Cards */}
                <section className="recipient-actions">

                    <div className="recipient-action-card">

                        <div className="recipient-action-icon">
                            🔎
                        </div>

                        <div>
                            <h2>Find Resources</h2>

                            <p>
                                Browse available resources shared
                                by providers in the community.
                            </p>

                            <button
                                className="dashboard-primary-button"
                                onClick={() =>
                                    navigate("/resources")
                                }
                            >
                                Browse Resources →
                            </button>
                        </div>

                    </div>


                    <div className="recipient-action-card">

                        <div className="recipient-action-icon">
                            📋
                        </div>

                        <div>
                            <h2>My Requests</h2>

                            <p>
                                View the resources you've requested
                                and track their current status.
                            </p>

                            <button
                                className="outline-button"
                                onClick={() =>
                                    navigate(
                                        "/recipient/requests"
                                    )
                                }
                            >
                                View My Requests →
                            </button>
                        </div>

                    </div>

                </section>


                {/* How it works */}
                <section className="how-it-works">

                    <div className="section-top">
                        <div>
                            <h2>How ReSource works</h2>

                            <p>
                                Get the resources you need in
                                just a few simple steps.
                            </p>
                        </div>
                    </div>


                    <div className="steps-grid">

                        <div className="step-card">

                            <div className="step-number">
                                01
                            </div>

                            <h3>Browse</h3>

                            <p>
                                Explore resources shared by
                                providers.
                            </p>

                        </div>


                        <div className="step-card">

                            <div className="step-number">
                                02
                            </div>

                            <h3>Request</h3>

                            <p>
                                Choose a resource and submit
                                your request.
                            </p>

                        </div>


                        <div className="step-card">

                            <div className="step-number">
                                03
                            </div>

                            <h3>Connect</h3>

                            <p>
                                Track your request and connect
                                with the provider.
                            </p>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default RecipientDashboard;