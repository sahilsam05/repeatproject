import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");

        axios
            .post(`${SERVER_HOST}/users/login/${email}/${password}`)
            .then((res) => {
                if (res.data.errorMessage) {
                    setErrorMessage(res.data.errorMessage);
                } else {
                    localStorage.name = res.data.name;
                    localStorage.accessLevel = res.data.accessLevel;
                    localStorage.token = res.data.token;

                    navigate("/products");
                }
            })
            .catch(() => {
                setErrorMessage("Login failed");
            });
    }

    const fieldStyle = {
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px"
    };

    return (
        <form
            className="form-container"
            noValidate={true}
            id="loginOrRegistrationForm"
            style={{ padding: "10px" }}
            onSubmit={handleSubmit}
        >
            <h2>Login</h2>

            {errorMessage && (
                <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
            )}

            <div style={fieldStyle}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div style={fieldStyle}>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit">Login</button>{" "}
            <Link to="/products">Cancel</Link>
        </form>
    );
}

export default Login;
