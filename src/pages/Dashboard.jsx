import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Filler,
} from "chart.js";
import "./styles/dashboard.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Filler
);

const PIE_COLORS = [
    "#8B5CF6",
    "#EC4899",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#EF4444",
    "#14B8A6",
    "#A855F7",
    "#F97316",
    "#22C55E",
];

const STAT_COLORS = [
    "#8B5CF6",
    "#EC4899",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#EF4444",
    "#14B8A6",
    "#A855F7",
];

function getYears(expenseList) {
    const years = [];

    expenseList.forEach((expense) => {
        if (expense.Date) {
            const year = new Date(expense.Date).getFullYear();
            if (!years.includes(year)) {
                years.push(year);
            }
        }
    });

    return years.sort();
}

function getFilteredByYear(expenseList, filter) {
    return expenseList.filter((expense) => {
        if (!expense.Date) return false;
        if (filter === "all") return true;
        return new Date(expense.Date).getFullYear() === Number(filter);
    });
}

function getCategoryTotals(expenseList) {
    const categoryTotals = {};

    expenseList.forEach((expense) => {
        const category = expense.Category;
        const amount = Number(expense.Amount);

        if (category) {
            categoryTotals[category] =
                (categoryTotals[category] || 0) + amount;
        }
    });

    return categoryTotals;
}

function getWeeklyTrend(expenseList) {
    let week1 = 0;
    let week2 = 0;
    let week3 = 0;
    let week4 = 0;

    expenseList.forEach((expense) => {
        if (!expense.Date) return;

        const day = new Date(expense.Date).getDate();
        const amount = Number(expense.Amount);

        if (day >= 1 && day <= 7) week1 += amount;
        else if (day >= 8 && day <= 14) week2 += amount;
        else if (day >= 15 && day <= 21) week3 += amount;
        else week4 += amount;
    });

    return [week1, week2, week3, week4];
}

function getMonthBarData(expenseList, selectedYear) {
    const monthData = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
};
    expenseList.forEach((expense) => {
        if (!expense.Date) return;

        if (
            selectedYear !== "all" &&
            new Date(expense.Date).getFullYear() != selectedYear
        ) {
            return;
        }

        const month = new Date(expense.Date).toLocaleString("default", {
            month: "short",
        });

        if (monthData[month] !== undefined) {
            monthData[month] += Number(expense.Amount);
        }
    });

    return [
    monthData.Jan,
    monthData.Feb,
    monthData.Mar,
    monthData.Apr,
    monthData.May,
    monthData.Jun,
    monthData.Jul,
    monthData.Aug,
    monthData.Sep,
    monthData.Oct,
    monthData.Nov,
    monthData.Dec,
];
}

function Dashboard() {
    const navigate = useNavigate();

    const [lightMode, setLightMode] = useState(false);
    const [pieFilter, setPieFilter] = useState("all");
    const [yearFilter, setYearFilter] = useState("all");
    const [expenses, setExpenses] = useState([]);

    const username = localStorage.getItem("username") || "User";
    const currentUser = localStorage.getItem("currentUser");

    useEffect(() => {
        const allExpenses =
            JSON.parse(localStorage.getItem("expenses")) || [];

        setExpenses(
            allExpenses.filter(
                (expense) => expense.userPhone === currentUser
            )
        );
    }, [currentUser]);

    const totalExpense = useMemo(
        () =>
            expenses.reduce(
                (sum, expense) => sum + Number(expense.Amount),
                0
            ),
        [expenses]
    );

    const monthlyBudget =
        Number(localStorage.getItem(currentUser + "_monthlyBudget")) || 0;

    const yearlyBudget =
        Number(localStorage.getItem(currentUser + "_yearlyBudget")) || 0;

    const monthlyLeft = useMemo(() => {
        if (monthlyBudget <= 0) return null;
        return Math.max(0, monthlyBudget - totalExpense);
    }, [monthlyBudget, totalExpense]);

    const yearlyLeft = useMemo(() => {
        if (yearlyBudget <= 0) return null;
        return Math.max(0, yearlyBudget - totalExpense);
    }, [yearlyBudget, totalExpense]);

    const years = useMemo(() => getYears(expenses), [expenses]);

    const pieFilteredExpenses = useMemo(
        () => getFilteredByYear(expenses, pieFilter),
        [expenses, pieFilter]
    );

    const categoryTotals = useMemo(
        () => getCategoryTotals(pieFilteredExpenses),
        [pieFilteredExpenses]
    );

    const pieLabels = Object.keys(categoryTotals);
    const pieValues = Object.values(categoryTotals);
    const pieTotal = pieValues.reduce((a, b) => a + b, 0);

    const weeklyTrend = useMemo(() => getWeeklyTrend(expenses), [expenses]);

    const barChartData = useMemo(
        () => getMonthBarData(expenses, yearFilter),
        [expenses, yearFilter]
    );

    const hasExpenses = expenses.length > 0;

    function toggleTheme() {
        setLightMode((prev) => !prev);
    }

    function handleLogout() {
        localStorage.removeItem("username");
        localStorage.removeItem("currentUser");
        navigate("/");
    }

    const pieChartData = {
        labels: pieLabels,
        datasets: [
            {
                data: pieValues,
                backgroundColor: PIE_COLORS,
                borderColor: "#ffffff",
                borderWidth: 2,
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: { color: "white", padding: 15 },
            },
        },
    };

    const lineChartData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
            {
                data: weeklyTrend,
                borderColor: "#8B5CF6",
                backgroundColor: "rgba(139,92,246,0.18)",
                fill: true,
                tension: 0.45,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: "#8B5CF6",
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
           x: {
    offset: true,
    ticks: {
        color: "#9ca3af",
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
    },
    grid: {
        display: false,
    },
},
            y: {
                beginAtZero: true,
                ticks: { color: "white" },
                grid: { color: "rgba(255,255,255,0.05)" },
            },
        },
    };

    const trendBarData = {
       labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
],
        datasets: [
            {
                data: barChartData,
                backgroundColor: "#8B5CF6",
                borderRadius: 8,
            },
        ],
    };

    const trendBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        x: {
            offset: true,
            ticks: {
                color: "#9ca3af",
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
            },
            grid: {
                display: false,
            },
        },
        y: {
            display: false,
            beginAtZero: true,
        },
    },
};

    return (
        <div
            className={`dashboard-page main${
                lightMode ? " light-mode" : ""
            }`}
        >
            <div className="sidebar">
                <div className="logo">
                    <i className="fa-solid fa-comments-dollar"></i>
                    <span>TrackFi</span>
                </div>

                <div className="sidebar-menu">
                    <Link to="/dashboard" className="menu-items active">
                        Dashboard
                    </Link>
                    <Link to="/addExpense" className="menu-items">
                        Add Expenses
                    </Link>
                    <Link to="/transaction" className="menu-items">
                        Transactions
                    </Link>
                    <Link to="/settings" className="menu-items">
                        Settings
                    </Link>
                </div>

                <div className="logout-section">
                    <button className="logout-btn" onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Logout
                    </button>
                </div>
            </div>

            <div className="content">
                <div className="page-header">
                    <div className="header-row">
                        <h1 id="WelcomeText">
                            Welcome To Your Dashboard, {username}
                        </h1>

                        <div className="theme-toggle">
                            <i
                                className={
                                    lightMode
                                        ? "fa-solid fa-sun"
                                        : "fa-solid fa-moon"
                                }
                            ></i>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={lightMode}
                                    onChange={toggleTheme}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="expense-box">
                        <div className="expense-header">
                            <h3>Total Expenses</h3>
                            <select
                                id="yearFilter"
                                className="year-filter"
                                value={yearFilter}
                                onChange={(e) =>
                                    setYearFilter(e.target.value)
                                }
                            >
                                <option value="all">All Years</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="expense-left">
                            <h1 id="totalExpense">₹{totalExpense}</h1>
                            <p id="transactionCount">
                                {expenses.length} Transactions
                            </p>

                            {!hasExpenses && (
                                <p id="emptyMessage">
                                    Start by adding your first expense!
                                </p>
                            )}

                            {monthlyLeft !== null && (
                                <p id="monthlyLeft">
                                    Monthly Budget Remaining : ₹{monthlyLeft}
                                </p>
                            )}

                            {yearlyLeft !== null && (
                                <p id="yearlyLeft">
                                    Yearly Budget Remaining : ₹{yearlyLeft}
                                </p>
                            )}
                        </div>

                        <div className="expense-right">
                            <Bar
                                id="expenseTrendChart"
                                data={trendBarData}
                                options={trendBarOptions}
                            />
                        </div>
                    </div>

                    <div className="chart-box">
                        <div className="chart-header">
                            <h3>Expense Distribution</h3>
                            <select
                                id="filterSelect"
                                value={pieFilter}
                                onChange={(e) =>
                                    setPieFilter(e.target.value)
                                }
                            >
                                <option value="all">All Time</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="distribution-container">
                            <div className="chart-side">
                                {hasExpenses && pieLabels.length > 0 ? (
                                    <Pie
                                        id="expenseChart"
                                        data={pieChartData}
                                        options={pieChartOptions}
                                    />
                                ) : (
                                    <div
                                        id="noPieData"
                                        style={{
                                            textAlign: "center",
                                            padding: "30px",
                                        }}
                                    >
                                        <h3>No Expense Data</h3>
                                        <p>
                                            Add your first expense to see
                                            category distribution.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="stats-side" id="categoryStats">
                                {pieLabels.map((label, index) => {
                                    const percentage =
                                        pieTotal > 0
                                            ? (
                                                  (pieValues[index] / pieTotal) *
                                                  100
                                              ).toFixed(1)
                                            : 0;

                                    return (
                                        <div
                                            className="stat-item"
                                            key={label}
                                        >
                                            <div className="stat-left">
                                                <div
                                                    className="color-dot"
                                                    style={{
                                                        background:
                                                            STAT_COLORS[
                                                                index %
                                                                    STAT_COLORS.length
                                                            ],
                                                    }}
                                                ></div>
                                                <span className="stat-name">
                                                    {label}
                                                </span>
                                            </div>
                                            <span className="stat-value">
                                                ₹{pieValues[index]} (
                                                {percentage}%)
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bar-chart-card">
                    <h3>Monthly Spending Trend</h3>

                    {hasExpenses ? (
                        <Line
                            id="monthlyChart"
                            data={lineChartData}
                            options={lineChartOptions}
                        />
                    ) : (
                        <div
                            id="noTrendData"
                            style={{
                                textAlign: "center",
                                padding: "30px",
                            }}
                        >
                            <h3>No Transactions Yet</h3>
                            <p>Your spending trend will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
