import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyRequests() {
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/requests/my", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setRequests(response.data.requests);
            } catch (error) {
                setMessage(
                    error.response?.data?.message ||
                    "Failed to load requests"
                );
            }
        };

        fetchRequests();
    }, []);

    return (
        <div>
            <h1>My Requests</h1>

            {message && <p>{message}</p>}

            {requests.length === 0 ? (
                <p>You have not made any requests yet.</p>
            ) : (
                requests.map((request) => (
                    <div key={request._id}>
                        <h2>
                            {request.resource?.title}
                        </h2>

                        <p>
                            Category:{" "}
                            {request.resource?.category}
                        </p>

                        <p>
                            Quantity Requested:{" "}
                            {request.quantity}
                        </p>

                        <p>
                            Message:{" "}
                            {request.message}
                        </p>

                        <p>
                            Status:{" "}
                            <strong>
                                {request.status}
                            </strong>
                        </p>

                        <p>
                            Requested on:{" "}
                            {new Date(
                                request.createdAt
                            ).toLocaleDateString()}
                        </p>

                        <hr />
                    </div>
                ))
            )}

            <button onClick={() => navigate("/recipient")}>
                Back to Dashboard
            </button>
        </div>
    );
}

export default MyRequests;