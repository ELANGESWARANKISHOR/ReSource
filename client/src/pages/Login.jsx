import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            const role = response.data.user.role;

            if (role === "provider") {
                navigate("/provider");
            } else if (role === "recipient") {
                navigate("/recipient");
            }

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Login failed"
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
                    <h1>Welcome back</h1>

                    <p>
                        Sign in to continue to your ReSource account.
                    </p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleLogin}
                >

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    {message && (
                        <div className="auth-error">
                            {message}
                        </div>
                    )}

                    <button
                        className="auth-submit"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <div className="auth-divider">
                    <span>or</span>
                </div>

                <p className="auth-footer">
                    Don't have an account?
                </p>

                <button
                    className="auth-register"
                    onClick={() => navigate("/register")}
                >
                    Create an Account
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

export default Login;