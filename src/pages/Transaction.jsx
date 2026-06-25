import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "./styles/transaction.css";

function Transaction() {

    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        let currentUser =
            localStorage.getItem("currentUser");

        let data =
            JSON.parse(localStorage.getItem("expenses")) || [];

        data = data.filter(

            expense =>

                expense.userPhone === currentUser

        );

        setExpenses(data);

    }, []);

    const filteredExpenses = useMemo(
        () =>
            expenses.filter(
                (expense) =>
                    (expense.Description || "")
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    (expense.Category || "")
                        .toLowerCase()
                        .includes(search.toLowerCase())
            ),
        [expenses, search]
    );

    return (

        <div className="transaction-page main">

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
                        className="menu-items active"
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

            {/* Content */}

            <div className="content">

                <div className="page-header">

                    <h1>Transactions</h1>

                    <p>

                        Track your spending history and stay in control of your finances.

                    </p>

                </div>

                <div className="transaction-card">

                    <div className="top-bar">

                        <input

                            className="search-box"

                            placeholder="Search Transaction..."

                            value={search}

                            onChange={(e) =>

                                setSearch(e.target.value)

                            }

                        />

                    </div>

                    <div className="transaction-header">

                        <span>Description</span>

                        <span>Category</span>

                        <span>Date</span>

                        <span>Amount</span>

                        <span>Payment Method</span>

                    </div>

                    <div>

                        {

                            filteredExpenses.length === 0 ?

                                (

                                    <div className="no-data">

                                        <h3>

                                            No Transactions Found

                                        </h3>

                                        <p>

                                            Start by adding your first expense.

                                        </p>

                                    </div>

                                )

                                :

                                (

                                    filteredExpenses.map(

                                        (expense, index) => (

                                            <div

                                                className="transaction-row"

                                                key={index}

                                            >

                                                <div>

                                                    {expense.Description}

                                                </div>

                                                <div>

                                                    {expense.Category}

                                                </div>

                                                <div>

                                                    {expense.Date}

                                                </div>

                                                <div>

                                                    ₹{expense.Amount}

                                                </div>

                                                <div>

                                                    {expense.PaymentMethod}

                                                </div>

                                            </div>

                                        )

                                    )

                                )

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Transaction;