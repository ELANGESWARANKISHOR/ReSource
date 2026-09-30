import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function ProviderDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const [resources, setResources] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/resources/my", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setResources(response.data.resources);
            } catch (error) {
                setMessage(
                    error.response?.data?.message ||
                    "Failed to load resources"
                );
            }
        };

        fetchResources();
    }, []);

    const availableResources = resources.filter(
        (resource) => resource.status === "available"
    );

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
                            navigate("/provider/create-resource")
                        }
                    >
                        <span>＋</span>
                        Create Resource
                    </button>

                    <button
                        className="sidebar-link"
                        onClick={() =>
                            navigate("/provider/requests")
                        }
                    >
                        <span>☷</span>
                        Manage Requests
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
                            PROVIDER DASHBOARD
                        </p>

                        <h1>Welcome back 👋</h1>

                        <p>
                            Manage the resources you have shared
                            with the community.
                        </p>
                    </div>

                    <button
                        className="dashboard-primary-button"
                        onClick={() =>
                            navigate("/provider/create-resource")
                        }
                    >
                        + Create Resource
                    </button>

                </header>


                {/* Statistics */}
                <section className="dashboard-stats">

                    <div className="stat-card">
                        <div className="stat-icon">
                            ♻
                        </div>

                        <div>
                            <span>Total Resources</span>
                            <strong>{resources.length}</strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            ✓
                        </div>

                        <div>
                            <span>Available</span>
                            <strong>
                                {availableResources.length}
                            </strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            📦
                        </div>

                        <div>
                            <span>Total Quantity</span>
                            <strong>
                                {resources.reduce(
                                    (total, resource) =>
                                        total + resource.quantity,
                                    0
                                )}
                            </strong>
                        </div>
                    </div>

                </section>


                {/* Resources */}
                <section className="resources-section">

                    <div className="section-top">

                        <div>
                            <h2>My Resources</h2>

                            <p>
                                Resources you have listed on ReSource.
                            </p>
                        </div>

                        <button
                            className="outline-button"
                            onClick={() =>
                                navigate("/provider/create-resource")
                            }
                        >
                            + Add Resource
                        </button>

                    </div>


                    {message && (
                        <div className="dashboard-error">
                            {message}
                        </div>
                    )}


                    {resources.length === 0 ? (

                        <div className="empty-state">

                            <div className="empty-icon">
                                ♻
                            </div>

                            <h3>No resources yet</h3>

                            <p>
                                You haven't created any resources.
                                Start by sharing something useful
                                with your community.
                            </p>

                            <button
                                className="dashboard-primary-button"
                                onClick={() =>
                                    navigate(
                                        "/provider/create-resource"
                                    )
                                }
                            >
                                Create Your First Resource
                            </button>

                        </div>

                    ) : (

                        <div className="resource-grid">

                            {resources.map((resource) => (

                                <div
                                    className="dashboard-resource-card"
                                    key={resource._id}
                                >

                                    <div className="resource-card-top">

                                        <div className="resource-card-icon">
                                            📦
                                        </div>

                                        <span
                                            className={
                                                resource.status ===
                                                "available"
                                                    ? "status-badge available"
                                                    : "status-badge"
                                            }
                                        >
                                            {resource.status}
                                        </span>

                                    </div>

                                    <h3>{resource.title}</h3>

                                    <p className="resource-category">
                                        {resource.category}
                                    </p>

                                    <div className="resource-details">

                                        <div>
                                            <span>Quantity</span>
                                            <strong>
                                                {resource.quantity}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Available</span>
                                            <strong>
                                                {resource.availableQuantity}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Location</span>
                                            <strong>
                                                {resource.location}
                                            </strong>
                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default ProviderDashboard;