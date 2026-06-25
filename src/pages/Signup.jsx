import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Signup() {

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    function createAccount() {

        if (
            username === "" ||
            phone === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {

            alert("Passwords do not match");
            return;
        }

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        let existingUser =
            users.find(
                user => user.phone === phone
            );

        if (existingUser) {

            alert("An account already exists with this phone number");
            return;
        }

        if (phone.length !== 10) {

            alert("Enter valid 10 digit phone number");
            return;
        }

        users.push({

            username,
            phone,
            password

        });

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        localStorage.setItem(
            "username",
            username
        );

        localStorage.setItem(
            "currentUser",
            phone
        );

        alert("Account Created Successfully");

        navigate("/");

    }

    return (

        <div className="auth-page">

        <div className="login-container">

            <h1>TrackFi</h1>

            <h2>Create Account</h2>

            <input
                type="text"
                placeholder="Create Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
                className="login-btn"
                onClick={createAccount}
            >
                Create Account
            </button>

            <p>
                Already have an account?
                <Link to="/"> Login</Link>
            </p>

        </div>

        </div>

    );

}

export default Signup;