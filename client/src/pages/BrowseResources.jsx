import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function BrowseResources() {
    const [resources, setResources] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await api.get("/resources");

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

    return (
        <div className="browse-page">

            {/* Top Navigation */}
            <header className="browse-header">

                <button
                    className="browse-logo"
                    onClick={() => navigate("/recipient")}
                >
                    <span>♻</span>
                    ReSource
                </button>

                <div className="browse-nav-actions">

                    <button
                        className="browse-nav-button"
                        onClick={() =>
                            navigate("/recipient")
                        }
                    >
                        Dashboard
                    </button>

                    <button
                        className="browse-nav-button"
                        onClick={() =>
                            navigate("/recipient/requests")
                        }
                    >
                        My Requests
                    </button>

                </div>

            </header>


            {/* Page Header */}
            <main className="browse-main">

                <div className="browse-page-header">

                    <div>

                        <p className="dashboard-label">
                            COMMUNITY RESOURCES
                        </p>

                        <h1>Available Resources</h1>

                        <p>
                            Discover useful resources shared by
                            people and organizations in your community.
                        </p>

                    </div>

                    <button
                        className="outline-button"
                        onClick={() =>
                            navigate("/recipient")
                        }
                    >
                        ← Dashboard
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

                        <h3>No resources available</h3>

                        <p>
                            There are currently no resources available.
                            Please check again later.
                        </p>

                    </div>

                ) : (

                    <div className="browse-resource-grid">

                        {resources.map((resource) => (

                            <div
                                className="browse-resource-card"
                                key={resource._id}
                            >

                                {/* Card Header */}
                                <div className="browse-card-header">

                                    <div className="browse-resource-icon">
                                        📦
                                    </div>

                                    <span
                                        className={
                                            resource.status === "available"
                                                ? "status-badge available"
                                                : "status-badge"
                                        }
                                    >
                                        {resource.status}
                                    </span>

                                </div>


                                {/* Title */}
                                <h2>{resource.title}</h2>

                                <span className="browse-category">
                                    {resource.category}
                                </span>


                                {/* Description */}
                                <p className="browse-description">
                                    {resource.description}
                                </p>


                                {/* Details */}
                                <div className="browse-resource-details">

                                    <div>
                                        <span>Available</span>

                                        <strong>
                                            {resource.availableQuantity}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Condition</span>

                                        <strong>
                                            {resource.condition}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Location</span>

                                        <strong>
                                            {resource.location}
                                        </strong>
                                    </div>

                                </div>


                                {/* Action */}
                                <button
                                    className="browse-view-button"
                                    onClick={() =>
                                        navigate(
                                            `/resources/${resource._id}`
                                        )
                                    }
                                >
                                    View Details →
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default BrowseResources;