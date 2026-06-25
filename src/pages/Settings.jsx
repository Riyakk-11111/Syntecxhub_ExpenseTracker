import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/settings.css";

function Settings() {

    const navigate = useNavigate();

    const [monthlyBudget, setMonthlyBudget] = useState("");
    const [yearlyBudget, setYearlyBudget] = useState("");

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        const savedMonthly =
            localStorage.getItem(currentUser + "_monthlyBudget") || "";
        const savedYearly =
            localStorage.getItem(currentUser + "_yearlyBudget") || "";

        setMonthlyBudget(savedMonthly);
        setYearlyBudget(savedYearly);
    }, []);

    function saveBudget() {

        if (monthlyBudget === "" && yearlyBudget === "") {

            alert("Please enter at least one budget");
            return;

        }

        let currentUser =
            localStorage.getItem("currentUser");

        localStorage.setItem(

            currentUser + "_monthlyBudget",

            monthlyBudget

        );

        localStorage.setItem(

            currentUser + "_yearlyBudget",

            yearlyBudget

        );

        alert("Budget Saved Successfully!");

        navigate("/dashboard");

    }

    return (

        <div className="settings-page main">

            {/* Sidebar */}

            <div className="sidebar">

                <div className="logo">

                    <i className="fa-solid fa-comments-dollar"></i>

                    <span>TrackFi</span>

                </div>

                <div className="sidebar-menu">

                    <Link
                        to="/dashboard"
                        className="menu-items"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/addExpense"
                        className="menu-items"
                    >
                        Add Expenses
                    </Link>

                    <Link
                        to="/transaction"
                        className="menu-items"
                    >
                        Transactions
                    </Link>

                    <Link
                        to="/settings"
                        className="menu-items active"
                    >
                        Settings
                    </Link>

                </div>

            </div>

            {/* Main Content */}

            <div className="content">

                <div className="page-header">

                    <h1>Settings</h1>

                    <p>

                        Manage your financial goals and budget limits.

                    </p>

                </div>

                <div className="settings-card">

                    <h2>Budget Settings</h2>

                    <div className="field">

                        <label>

                            Monthly Budget

                        </label>

                        <div className="input-box">

                            <span>₹</span>

                            <input

                                type="number"

                                placeholder="Enter Monthly Budget"

                                value={monthlyBudget}

                                onChange={(e) =>
                                    setMonthlyBudget(e.target.value)
                                }

                            />

                        </div>

                    </div>

                    <div className="field">

                        <label>

                            Yearly Budget

                        </label>

                        <div className="input-box">

                            <span>₹</span>

                            <input

                                type="number"

                                placeholder="Enter Yearly Budget"

                                value={yearlyBudget}

                                onChange={(e) =>
                                    setYearlyBudget(e.target.value)
                                }

                            />

                        </div>

                    </div>

                    <button

                        className="save-btn"

                        onClick={saveBudget}

                    >

                        Save Budget

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Settings;