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

    return (
        <div>
            <h1>Provider Dashboard</h1>

            <button
                onClick={() => navigate("/provider/requests")}
            >
                Manage Requests
            </button>

            <button onClick={() => navigate("/provider/create-resource")}>
                Create Resource
            </button>
            <h2>My Resources</h2>

            <button onClick={handleLogout}>
                Logout
            </button>


            {message && <p>{message}</p>}

            {resources.length === 0 ? (
                <p>You have not created any resources yet.</p>
            ) : (
                resources.map((resource) => (
                    <div key={resource._id}>
                        <h3>{resource.title}</h3>

                        <p>
                            Category: {resource.category}
                        </p>

                        <p>
                            Quantity: {resource.quantity}
                        </p>

                        <p>
                            Available: {resource.availableQuantity}
                        </p>

                        <p>
                            Location: {resource.location}
                        </p>

                        <p>
                            Status: {resource.status}
                        </p>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default ProviderDashboard;