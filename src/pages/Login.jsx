import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            navigate("/dashboard");
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="page" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="card" style={{ width: "360px" }}>
                <h2 className="page-title" style={{ textAlign: "center" }}>
                    ERP Login
                </h2>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button className="btn primary" onClick={handleLogin} style={{ width: "100%" }}>
                    Login
                </button>
            </div>
        </div>
    );
}
