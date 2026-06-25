let username =
localStorage.getItem("username") || "User";

document.getElementById("WelcomeText").innerText =
`Welcome To Your Dashboard, ${username}`;


// ======================
// GET EXPENSES
// ======================

let expenses =
JSON.parse(localStorage.getItem("expenses")) || [];

let currentUser =
localStorage.getItem("currentUser");

expenses = expenses.filter(
    expense =>
    expense.userPhone === currentUser
);

if(expenses.length === 0){

    document.getElementById("totalExpense")
    .innerText = "₹0";

    document.getElementById("transactionCount")
    .innerText = "0 Transactions";

    document.getElementById("emptyMessage")
    .innerText =
    "Start by adding your first expense!";

    document.getElementById("expenseChart")
    .style.display = "none";

    document.getElementById("monthlyChart")
    .style.display = "none";

    document.getElementById("noPieData")
    .style.display = "block";

    document.getElementById("noTrendData")
    .style.display = "block";
}

let totalExpense = 0;

expenses.forEach(expense => {

    totalExpense +=
    Number(expense.Amount);

});

document.getElementById("totalExpense").innerText =
"₹" + totalExpense;

document.getElementById("transactionCount").innerText =
expenses.length + " Transactions";


// ======================
// BUDGET LOGIC
// ======================
let monthlyBudget =
Number(
localStorage.getItem(
currentUser + "_monthlyBudget"
)
) || 0;

let yearlyBudget =
Number(
localStorage.getItem(
currentUser + "_yearlyBudget"
)
) || 0;


// Monthly Budget

if(monthlyBudget > 0){

    let monthlyLeft =
    monthlyBudget - totalExpense;

    if(monthlyLeft < 0){
        monthlyLeft = 0;
    }

    document.getElementById("monthlyLeft").innerText =
    "Monthly Budget Remaining : ₹" + monthlyLeft;
}


// Yearly Budget

if(yearlyBudget > 0){

    let yearlyLeft =
    yearlyBudget - totalExpense;

    if(yearlyLeft < 0){
        yearlyLeft = 0;
    }

    document.getElementById("yearlyLeft").innerText =
    "Yearly Budget Remaining : ₹" + yearlyLeft;
}


// ======================
// LIGHT MODE
// ======================

function toggleTheme(){

    document.body.classList.toggle("light-mode");

    let icon =
    document.querySelector(".theme-toggle i");

    if(
        document.body.classList.contains("light-mode")
    ){
        icon.className =
        "fa-solid fa-sun";
    }

    else{

        icon.className =
        "fa-solid fa-moon";
    }

}


// ======================
// PIE CHART DATA
// ======================

let categoryTotals = {};

expenses.forEach(expense => {

    let category =
    expense.Category;

    let amount =
    Number(expense.Amount);

    if(category){

        if(categoryTotals[category]){

            categoryTotals[category] += amount;

        }

        else{

            categoryTotals[category] = amount;

        }

    }

});

let labels =
Object.keys(categoryTotals);

let values =
Object.values(categoryTotals);

function getFilteredExpenses(){

    let filter =
    document.getElementById("filterSelect").value;

    return expenses.filter(expense => {

        if(!expense.Date){
            return false;
        }

        // All Time

        if(filter === "all"){
            return true;
        }

        // Selected Year

        let expenseYear =
        new Date(expense.Date)
        .getFullYear();

        return expenseYear ==
        Number(filter);

    });

}


// ======================
// PIE CHART
// ======================
const filterSelect =
document.getElementById("filterSelect");

let years = [];

expenses.forEach(expense => {

    if(expense.Date){

        let year =
        new Date(expense.Date)
        .getFullYear();

        if(!years.includes(year)){

            years.push(year);
        }
    }

});

years.sort();

years.forEach(year => {

    filterSelect.innerHTML +=

    `<option value="${year}">
        ${year}
    </option>`;
});

function updatePieChart(){

    let filteredExpenses =
    getFilteredExpenses();

    let categoryTotals = {};

    filteredExpenses.forEach(expense => {

        let category = expense.Category;
        let amount = Number(expense.Amount);

        if(category){

            if(categoryTotals[category]){
                categoryTotals[category] += amount;
            }
            else{
                categoryTotals[category] = amount;
            }
        }

    });

    let newLabels =
    Object.keys(categoryTotals);

    let newValues =
    Object.values(categoryTotals);

    pieChart.data.labels =
    newLabels;

    pieChart.data.datasets[0].data =
    newValues;

    pieChart.update();

    // UPDATE RIGHT SIDE CARDS

    let total =
    newValues.reduce((a,b)=>a+b,0);

    let statsHTML = "";

    newLabels.forEach((label,index)=>{

        let percentage =
        total > 0
        ? ((newValues[index]/total)*100).toFixed(1)
        : 0;

        statsHTML += `

        <div class="stat-item">

            <div class="stat-left">

                <div
                class="color-dot"
                style="background:${colors[index % colors.length]}">
                </div>

                <span class="stat-name">
                    ${label}
                </span>

            </div>

            <span class="stat-value">
                ₹${newValues[index]}
                (${percentage}%)
            </span>

        </div>

        `;

    });

    document.getElementById(
    "categoryStats"
    ).innerHTML = statsHTML;

}
      

let pieChart;

if(expenses.length > 0){

const ctx =
document.getElementById("expenseChart");

pieChart =
new Chart(ctx,{

    type:"pie",

    data:{

        labels:labels,

        datasets:[{

            data:values,

            backgroundColor:[
                "#8B5CF6",
                "#EC4899",
                "#F59E0B",
                "#10B981",
                "#3B82F6",
                "#EF4444",
                "#14B8A6",
                "#A855F7",
                "#F97316",
                "#22C55E"
            ],

            borderColor:"#ffffff",
            borderWidth:2
        }]
    
    },

    options:{

        responsive:true,

        plugins:{

            legend:{

                position:"bottom",

                labels:{

                    color:"white",
                    padding:15
                }
            }
        }
    }

});
}

const colors = [
    "#8B5CF6",
    "#EC4899",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#EF4444",
    "#14B8A6",
    "#A855F7"
];



// ======================
// WEEKLY EXPENSE TREND
// ======================

let week1 = 0;
let week2 = 0;
let week3 = 0;
let week4 = 0;

expenses.forEach(expense => {

    if(!expense.Date) return;

    let day =
    new Date(expense.Date).getDate();

    let amount =
    Number(expense.Amount);

    if(day >= 1 && day <= 7){

        week1 += amount;

    }

    else if(day >= 8 && day <= 14){

        week2 += amount;

    }

    else if(day >= 15 && day <= 21){

        week3 += amount;

    }

    else{

        week4 += amount;

    }

});


let trendLabels = [

    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4"

];

let trendValues = [

    week1,
    week2,
    week3,
    week4

];


// ======================
// LINE GRAPH
// ======================

const monthlyCtx =
document.getElementById("monthlyChart");

new Chart(monthlyCtx, {

    type:"line",

    data:{

        labels:trendLabels,

        datasets:[{

            data:trendValues,

            borderColor:"#8B5CF6",

            backgroundColor:
            "rgba(139,92,246,0.18)",

            fill:true,

            tension:0.45,

            pointRadius:5,

            pointHoverRadius:8,

            pointBackgroundColor:"#8B5CF6"
        }]
    },

    options:{

        responsive:true,

        plugins:{

            legend:{
                display:false
            }
        },

        scales:{

            x:{

                ticks:{
                    color:"white"
                },

                grid:{
                    color:"rgba(255,255,255,0.05)"
                }
            },

            y:{

                beginAtZero:true,

                ticks:{
                    color:"white"
                },

                grid:{
                    color:"rgba(255,255,255,0.05)"
                }
            }
        }
    }
});

// ======================
// MINI MONTH BAR CHART
// ======================

let monthData = {
    Jan:0,
    Feb:0,
    Mar:0,
    Apr:0,
    May:0,
    Jun:0,
    Jul:0,
    Aug:0,
    Sep:0,
    Oct:0,
    Nov:0,
    Dec:0
};

expenses.forEach(expense => {

    if(expense.Date){

        let month =
        new Date(expense.Date)
        .toLocaleString("default",
        {month:"short"});

        monthData[month] +=
        Number(expense.Amount);
    }

});

const trendCtx =
document.getElementById("expenseTrendChart");

let trendChart = new Chart(trendCtx, {

    type:"bar",

    data:{

        labels:[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun"
        ],

        datasets:[{

            data:[

                monthData.Jan,
                monthData.Feb,
                monthData.Mar,
                monthData.Apr,
                monthData.May,
                monthData.Jun

            ],

            backgroundColor:"#8B5CF6",

            borderRadius:8
        }]
    },

    options:{

        responsive:true,

        maintainAspectRatio:false,

        plugins:{

            legend:{
                display:false
            }
        },

        scales:{

            x:{

                ticks:{
                    color:"#9ca3af"
                },

                grid:{
                    display:false
                }
            },

            y:{

                display:false,

                beginAtZero:true
            }
        }
    }
});
function updateBarChart(){

    let selectedYear =
    document.getElementById("yearFilter").value;

    let filteredExpenses =
    expenses.filter(expense => {

        if(selectedYear === "all"){
            return true;
        }

        return new Date(expense.Date)
        .getFullYear() == selectedYear;

    });

    let monthData = {
        Jan:0,
        Feb:0,
        Mar:0,
        Apr:0,
        May:0,
        Jun:0
    };

    filteredExpenses.forEach(expense => {

        let month =
        new Date(expense.Date)
        .toLocaleString("default",
        {month:"short"});

        if(monthData[month] !== undefined){

            monthData[month] +=
            Number(expense.Amount);

        }

    });

    trendChart.data.datasets[0].data = [

        monthData.Jan,
        monthData.Feb,
        monthData.Mar,
        monthData.Apr,
        monthData.May,
        monthData.Jun

    ];

    trendChart.update();

}
document
.getElementById("filterSelect")
.addEventListener("change", () => {

    if(pieChart){
        updatePieChart();
    }

    updateBarChart();

});

// ======================
// LOGOUT
// ======================

window.onload = function(){

    document.getElementById("logoutBtn").onclick = function(){

        localStorage.removeItem("username");
        localStorage.removeItem("currentUser");

        window.location.href = "login.html";

    };

};

// ======================
// YEAR FILTER FOR BAR CHART
// ======================

const yearFilter =
document.getElementById("yearFilter");

let barYears = [];

expenses.forEach(expense => {

    if(expense.Date){

        let year =
        new Date(expense.Date)
        .getFullYear();

        if(!barYears.includes(year)){

            barYears.push(year);

        }

    }

});

barYears.sort();

barYears.forEach(year => {

    yearFilter.innerHTML +=
    `<option value="${year}">
        ${year}
    </option>`;

});

yearFilter.addEventListener("change", updateBarChart);