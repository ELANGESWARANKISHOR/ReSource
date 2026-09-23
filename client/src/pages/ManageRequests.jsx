import { useEffect, useState } from "react";
import api from "../services/api";

function ManageRequests() {
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/requests/provider", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setRequests(response.data.requests);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load requests"
            );
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleRequest = async (requestId, action) => {
        try {
            setMessage("");
            setError("");

            const token = localStorage.getItem("token");

            await api.put(
                `/requests/${requestId}/${action}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(`Request ${action}ed successfully`);

            fetchRequests();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                `Failed to ${action} request`
            );
        }
    };

    return (
        <div>
            <h1>Manage Requests</h1>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            {requests.length === 0 ? (
                <p>No requests received yet.</p>
            ) : (
                requests.map((request) => (
                    <div key={request._id}>
                        <h2>
                            {request.resource?.title}
                        </h2>

                        <p>
                            Requester:{" "}
                            {request.requester?.name}
                        </p>

                        <p>
                            Email:{" "}
                            {request.requester?.email}
                        </p>

                        <p>
                            Quantity:{" "}
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

                        {request.status === "pending" && (
                            <div>
                                <button
                                    onClick={() =>
                                        handleRequest(
                                            request._id,
                                            "accept"
                                        )
                                    }
                                >
                                    Accept
                                </button>

                                <button
                                    onClick={() =>
                                        handleRequest(
                                            request._id,
                                            "reject"
                                        )
                                    }
                                >
                                    Reject
                                </button>
                            </div>
                        )}

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default ManageRequests;