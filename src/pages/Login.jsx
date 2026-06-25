import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function login() {

        if (username === "") {
            alert("Please enter username");
            return;
        }

        if (password === "") {
            alert("Please enter password");
            return;
        }

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        let user =
            users.find(
                u => u.username === username
            );

        if (!user) {
            alert("Account Not Found");
            return;
        }

        if (user.password !== password) {
            alert("Incorrect Password");
            return;
        }

        localStorage.setItem(
            "username",
            user.username
        );

        localStorage.setItem(
            "currentUser",
            user.phone
        );

        alert("Login Successful");

        navigate("/dashboard");

    }

    return (

        <div className="auth-page">

        <div className="login-container">

            <h1>
                <i className="fa-solid fa-comments-dollar"></i>
                {" "}TrackFi
            </h1>

            <h2>Welcome Back</h2>

            <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={login}>
                Login
            </button>

            <p>
                New to TrackFi?
                <Link to="/signup"> Sign Up</Link>
            </p>

            <p className="forgot-link">
                <Link to="/forgotPassword">
    Forgot Password?
</Link>
            </p>

        </div>

        </div>

    );

}

export default Login;