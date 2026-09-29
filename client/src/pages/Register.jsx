import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "recipient"
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const response = await api.post(
                "/auth/register",
                formData
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    <span>♻</span>
                    ReSource
                </div>

                <div className="auth-header">
                    <h1>Create your account</h1>

                    <p>
                        Join ReSource and start sharing useful
                        resources with your community.
                    </p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleRegister}
                >

                    <div className="form-group">
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Account Type</label>

                        <select
                            className="auth-select"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="recipient">
                                Recipient
                            </option>

                            <option value="provider">
                                Provider
                            </option>
                        </select>
                    </div>

                    {message && (
                        <div className="auth-success">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <button
                        className="auth-submit"
                        type="submit"
                    >
                        Create Account
                    </button>

                </form>

                <div className="auth-divider">
                    <span>or</span>
                </div>

                <p className="auth-footer">
                    Already have an account?
                </p>

                <button
                    className="auth-register"
                    onClick={() => navigate("/login")}
                >
                    Sign In
                </button>

                <button
                    className="back-home"
                    onClick={() => navigate("/")}
                >
                    ← Back to Home
                </button>

            </div>

        </div>
    );
}

export default Register;