import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/addExpense.css";

function AddExpense() {

    const navigate = useNavigate();

    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("Select Category");
    const [description, setDescription] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("UPI");

    function saveExpense() {

        let currentUser =
            localStorage.getItem("currentUser");

        let expense = {

            userPhone: currentUser,

            Description: description,

            Category: category,

            Date: date,

            Amount: amount,

            PaymentMethod: paymentMethod

        };

        let expenses =
            JSON.parse(localStorage.getItem("expenses")) || [];

        expenses.push(expense);

        localStorage.setItem(

            "expenses",

            JSON.stringify(expenses)

        );

        alert("Expense Saved Successfully!");

        navigate("/transaction");

    }

    return (

        <div className="add-expense-page main">

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
                        className="menu-items active"
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
                        className="menu-items"
                    >
                        Settings
                    </Link>

                </div>

            </div>

            {/* Main Content */}

            <div className="main-content">

                <div className="page-header">

                    <h1>Add Expenses</h1>

                    <p>

                        Record your transactions and monitor your budget in real time.

                    </p>

                </div>

                <div className="expense-container">

                    <div className="main-content-left">

                        <div className="transaction-card">

                            <h2>Transaction Details</h2>

                            <p>

                                Fill in the fields below to log your expenses.

                            </p>

                            <div className="row">

                                <div className="field">

                                    <label>Amount</label>

                                    <input

                                        type="number"

                                        placeholder="₹ 0.00"

                                        value={amount}

                                        onChange={(e) =>

                                            setAmount(e.target.value)

                                        }

                                    />

                                </div>

                                <div className="field">

                                    <label>Date</label>

                                    <input

                                        type="date"

                                        value={date}

                                        onChange={(e) =>

                                            setDate(e.target.value)

                                        }

                                    />

                                </div>

                            </div>

                            <div className="field">

                                <label>Category</label>

                                <select

                                    value={category}

                                    onChange={(e) =>

                                        setCategory(e.target.value)

                                    }

                                >

                                    <option>Select Category</option>

                                    <option>Food</option>

                                    <option>Shopping</option>

                                    <option>Travel</option>

                                    <option>College fees</option>

                                    <option>Groceries</option>

                                    <option>Entertainment</option>

                                    <option>Recharge</option>

                                    <option>Personal care</option>

                                    <option>Medical and healthcare</option>

                                    <option>Rent and utilities</option>

                                    <option>Fitness</option>

                                    <option>Software and courses</option>

                                    <option>Other</option>

                                </select>

                            </div>

                            <div className="field-description">

                                <label>Description</label>

                                <textarea

                                    placeholder="What did you buy?"

                                    value={description}

                                    onChange={(e) =>

                                        setDescription(e.target.value)

                                    }

                                >

                                </textarea>

                            </div>

                            <div className="payment-method">

                                <h3>Payment Method</h3>

                                <select

                                    value={paymentMethod}

                                    onChange={(e) =>

                                        setPaymentMethod(e.target.value)

                                    }

                                >

                                    <option>UPI</option>

                                    <option>Cash</option>

                                    <option>Credit Card</option>

                                    <option>Debit Card</option>

                                </select>

                            </div>

                            <div className="buttons">

                                <button

                                    className="save-btn"

                                    onClick={saveExpense}

                                >

                                    Save Expense

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddExpense;