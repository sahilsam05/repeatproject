// client/src/components/Register.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        axios
            .post(`${SERVER_HOST}/users/register/${name}/${email}/${password}`)
            .then((res) => {
                if (res.data.errorMessage) {
                    setErrorMessage(res.data.errorMessage);
                } else {
                    // Derek's example redirects back to main list on success
                    navigate("/products");
                }
            })
            .catch(() => {
                setErrorMessage("Registration failed");
            });
    }

    const fieldStyle = {
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
    };

    return (
        <form
            className="form-container"
            noValidate={true}
            id="loginOrRegistrationForm"
            style={{ padding: "10px" }}
            onSubmit={handleSubmit}
        >
            <h2>New User Registration</h2>

            {errorMessage && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                    {errorMessage}
                </div>
            )}

            <div style={fieldStyle}>
                <label>Name</label>
                <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    required
                />
            </div>

            <div style={fieldStyle}>
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div style={fieldStyle}>
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div style={fieldStyle}>
                <label>Confirm Password</label>
                <input
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit">Register New User</button>{" "}
            <Link to="/products">Cancel</Link>
        </form>
    );
}

export default Register;
