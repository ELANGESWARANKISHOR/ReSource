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
        <div>
            <h1>Create Resource</h1>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Resource title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <br />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <br />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />

                <br />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    required
                />

                <br />

                <input
                    type="text"
                    name="condition"
                    placeholder="Condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                />

                <br />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />

                <br />

                <label>
                    Available Until
                </label>

                <br />

                <input
                    type="date"
                    name="availableUntil"
                    value={formData.availableUntil}
                    onChange={handleChange}
                    required
                />

                <br />

                <button type="submit">
                    Create Resource
                </button>

            </form>

            <br />

            <button onClick={() => navigate("/provider")}>
                Back to Dashboard
            </button>
        </div>
    );
}

export default CreateResource;