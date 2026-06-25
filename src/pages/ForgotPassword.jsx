import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function ForgotPassword() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [newPassword, setNewPassword] = useState("");

    function resetPassword() {

        if (
            username === "" ||
            phone === "" ||
            newPassword === ""
        ) {

            alert("Please fill all fields");
            return;

        }

        let users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];

        let user = users.find((u) => u.phone === phone);

        if (!user) {

            alert(
                "Username or Phone Number is incorrect"
            );

            return;

        }

        user.password = newPassword;

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Password Reset Successfully");

        navigate("/");

    }

    return (

        <div className="auth-page">

        <div className="login-container">

            <h2>Reset Password</h2>

            <input

                type="text"

                placeholder="Enter Username"

                value={username}

                onChange={(e) =>
                    setUsername(e.target.value)
                }

            />

            <input

                type="text"

                placeholder="Enter Registered Phone Number"

                value={phone}

                onChange={(e) =>
                    setPhone(e.target.value)
                }

            />

            <input

                type="password"

                placeholder="Enter New Password"

                value={newPassword}

                onChange={(e) =>
                    setNewPassword(e.target.value)
                }

            />

            <button
                onClick={resetPassword}
            >
                Reset Password
            </button>

        </div>

        </div>

    );

}

export default ForgotPassword;