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
        <div>
            <h1>Available Resources</h1>

            {message && <p>{message}</p>}

            {resources.length === 0 ? (
                <p>No resources available.</p>
            ) : (
                resources.map((resource) => (
                    <div key={resource._id}>
                        <h2>{resource.title}</h2>

                        <p>
                            Category: {resource.category}
                        </p>

                        <p>
                            Description: {resource.description}
                        </p>

                        <p>
                            Available Quantity:{" "}
                            {resource.availableQuantity}
                        </p>

                        <p>
                            Condition: {resource.condition}
                        </p>

                        <p>
                            Location: {resource.location}
                        </p>

                        <p>
                            Status: {resource.status}
                        </p>

                        <button
                            onClick={() =>
                                navigate(`/resources/${resource._id}`)
                            }
                        >
                            View Details
                        </button>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default BrowseResources;