import { useNavigate } from "react-router-dom";

function RecipientDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div>
            <h1>Recipient Dashboard</h1>

            <p>
                Welcome to your ReSource recipient dashboard.
            </p>

            <button
                onClick={() => navigate("/resources")}
            >
                Browse Resources
            </button>

            <button
                onClick={() => navigate("/recipient/requests")}
            >
                My Requests
            </button>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default RecipientDashboard;