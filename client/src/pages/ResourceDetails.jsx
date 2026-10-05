import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ResourceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [resource, setResource] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [requestMessage, setRequestMessage] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const response = await api.get(`/resources/${id}`);

                setResource(response.data.resource);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load resource"
                );
            }
        };

        fetchResource();
    }, [id]);

    const handleRequest = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/requests",
                {
                    resourceId: id,
                    quantity: Number(quantity),
                    message: requestMessage
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/recipient");
            }, 1000);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create request"
            );
        }
    };

    if (error && !resource) {
        return (
            <div className="details-page">
                <div className="details-error">
                    <h2>Unable to load resource</h2>
                    <p>{error}</p>

                    <button
                        className="dashboard-primary-button"
                        onClick={() => navigate("/resources")}
                    >
                        ← Back to Resources
                    </button>
                </div>
            </div>
        );
    }

    if (!resource) {
        return (
            <div className="details-page">
                <div className="details-loading">
                    Loading resource...
                </div>
            </div>
        );
    }

    return (
        <div className="details-page">

            {/* Header */}
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
                            navigate("/resources")
                        }
                    >
                        Browse Resources
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


            <main className="details-main">

                {/* Back */}
                <button
                    className="details-back"
                    onClick={() => navigate("/resources")}
                >
                    ← Back to Resources
                </button>


                <div className="details-layout">

                    {/* Resource Information */}
                    <section className="resource-info-card">

                        <div className="details-card-top">

                            <div className="details-resource-icon">
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


                        <span className="details-category">
                            {resource.category}
                        </span>

                        <h1>{resource.title}</h1>

                        <p className="details-description">
                            {resource.description}
                        </p>


                        {/* Information */}
                        <div className="details-info-grid">

                            <div className="details-info-item">
                                <span>Available Quantity</span>

                                <strong>
                                    {resource.availableQuantity}
                                </strong>
                            </div>

                            <div className="details-info-item">
                                <span>Total Quantity</span>

                                <strong>
                                    {resource.quantity}
                                </strong>
                            </div>

                            <div className="details-info-item">
                                <span>Condition</span>

                                <strong>
                                    {resource.condition}
                                </strong>
                            </div>

                            <div className="details-info-item">
                                <span>Location</span>

                                <strong>
                                    {resource.location}
                                </strong>
                            </div>

                        </div>


                        <div className="details-availability">

                            <span>
                                Availability
                            </span>

                            <div className="availability-bar">

                                <div
                                    className="availability-progress"
                                    style={{
                                        width: `${Math.min(
                                            100,
                                            (resource.availableQuantity /
                                                resource.quantity) *
                                                100
                                        )}%`
                                    }}
                                />

                            </div>

                            <small>
                                {resource.availableQuantity} of{" "}
                                {resource.quantity} available
                            </small>

                        </div>

                    </section>


                    {/* Request Form */}
                    <section className="request-card">

                        <div className="request-card-header">

                            <div className="request-icon">
                                ✋
                            </div>

                            <div>
                                <h2>Request this Resource</h2>

                                <p>
                                    Tell the provider what you need.
                                </p>
                            </div>

                        </div>


                        {message && (
                            <div className="auth-success form-message">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="auth-error form-message">
                                {error}
                            </div>
                        )}


                        <form
                            className="request-form"
                            onSubmit={handleRequest}
                        >

                            <div className="form-group">

                                <label>Quantity</label>

                                <input
                                    type="number"
                                    min="1"
                                    max={resource.availableQuantity}
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <small>
                                    Maximum available:{" "}
                                    {resource.availableQuantity}
                                </small>

                            </div>


                            <div className="form-group">

                                <label>Message</label>

                                <textarea
                                    placeholder="Why do you need this resource?"
                                    value={requestMessage}
                                    onChange={(e) =>
                                        setRequestMessage(
                                            e.target.value
                                        )
                                    }
                                    rows="6"
                                    required
                                />

                            </div>


                            <button
                                className="dashboard-primary-button request-submit"
                                type="submit"
                                disabled={
                                    resource.status !== "available" ||
                                    resource.availableQuantity <= 0
                                }
                            >
                                Request Resource
                            </button>

                        </form>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default ResourceDetails;