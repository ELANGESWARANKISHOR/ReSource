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
        return <p>{error}</p>;
    }

    if (!resource) {
        return <p>Loading resource...</p>;
    }

    return (
        <div>
            <h1>{resource.title}</h1>

            <p>
                <strong>Description:</strong>{" "}
                {resource.description}
            </p>

            <p>
                <strong>Category:</strong>{" "}
                {resource.category}
            </p>

            <p>
                <strong>Quantity:</strong>{" "}
                {resource.quantity}
            </p>

            <p>
                <strong>Available Quantity:</strong>{" "}
                {resource.availableQuantity}
            </p>

            <p>
                <strong>Condition:</strong>{" "}
                {resource.condition}
            </p>

            <p>
                <strong>Location:</strong>{" "}
                {resource.location}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                {resource.status}
            </p>

            <hr />

            <h2>Request this Resource</h2>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            <form onSubmit={handleRequest}>

                <label>
                    Quantity
                </label>

                <br />

                <input
                    type="number"
                    min="1"
                    max={resource.availableQuantity}
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(e.target.value)
                    }
                    required
                />

                <br />
                <br />

                <label>
                    Message
                </label>

                <br />

                <textarea
                    placeholder="Why do you need this resource?"
                    value={requestMessage}
                    onChange={(e) =>
                        setRequestMessage(e.target.value)
                    }
                    required
                />

                <br />
                <br />

                <button type="submit">
                    Request Resource
                </button>

            </form>
        </div>
    );
}

export default ResourceDetails;