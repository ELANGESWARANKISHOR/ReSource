import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateResource() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        quantity: "",
        condition: "",
        location: "",
        availableUntil: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/resources",
                {
                    ...formData,
                    quantity: Number(formData.quantity)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/provider");
            }, 1000);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create resource"
            );
        }
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

                    <button
                        className="sidebar-link"
                        onClick={() =>
                            navigate("/provider")
                        }
                    >
                        <span>⌂</span>
                        Dashboard
                    </button>

                    <button className="sidebar-link active">
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
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        navigate("/");
                    }}
                >
                    <span>↪</span>
                    Logout
                </button>

            </aside>


            {/* Main Content */}
            <main className="dashboard-main">

                <div className="form-page-header">

                    <div>
                        <p className="dashboard-label">
                            RESOURCE MANAGEMENT
                        </p>

                        <h1>Create Resource</h1>

                        <p>
                            Share a useful resource with people
                            in your community.
                        </p>
                    </div>

                    <button
                        className="outline-button"
                        onClick={() =>
                            navigate("/provider")
                        }
                    >
                        ← Back to Dashboard
                    </button>

                </div>


                <div className="resource-form-card">

                    <div className="resource-form-heading">

                        <div className="form-heading-icon">
                            📦
                        </div>

                        <div>
                            <h2>Resource Information</h2>

                            <p>
                                Provide the details of the resource
                                you want to share.
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
                        className="resource-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Title */}
                        <div className="form-group full-width">

                            <label>Resource Title</label>

                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Office Chairs"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Description */}
                        <div className="form-group full-width">

                            <label>Description</label>

                            <textarea
                                name="description"
                                placeholder="Describe the resource, its condition and any other useful information..."
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                required
                            />

                        </div>


                        {/* Category */}
                        <div className="form-group">

                            <label>Category</label>

                            <input
                                type="text"
                                name="category"
                                placeholder="e.g. Furniture"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Quantity */}
                        <div className="form-group">

                            <label>Quantity</label>

                            <input
                                type="number"
                                name="quantity"
                                placeholder="e.g. 10"
                                value={formData.quantity}
                                onChange={handleChange}
                                min="1"
                                required
                            />

                        </div>


                        {/* Condition */}
                        <div className="form-group">

                            <label>Condition</label>

                            <input
                                type="text"
                                name="condition"
                                placeholder="e.g. Good"
                                value={formData.condition}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Location */}
                        <div className="form-group">

                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                placeholder="e.g. Colombo"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Available Until */}
                        <div className="form-group full-width">

                            <label>Available Until</label>

                            <input
                                type="date"
                                name="availableUntil"
                                value={formData.availableUntil}
                                onChange={handleChange}
                                required
                            />

                            <small>
                                Select the last date this resource
                                will be available.
                            </small>

                        </div>


                        {/* Actions */}
                        <div className="resource-form-actions">

                            <button
                                type="button"
                                className="outline-button"
                                onClick={() =>
                                    navigate("/provider")
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="dashboard-primary-button"
                            >
                                Create Resource
                            </button>

                        </div>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default CreateResource;