let expenses =
JSON.parse(localStorage.getItem("expenses")) || [];

let currentUser =
localStorage.getItem("currentUser");

expenses = expenses.filter(
    expense =>
    expense.userPhone === currentUser
);
let transactionList =
document.getElementById("transactionList");

let searchBox =
document.getElementById("searchBox");

function displayTransactions(data){

    transactionList.innerHTML = "";

    if(data.length === 0){
    transactionList.innerHTML =
    `
    <div class="no-data">

    <h3>No Transactions Found</h3>

    <p>
        Start by adding your first expense.
    </p>

</div>
    `;
    return;
}

    data.forEach((expense) => {

        transactionList.innerHTML += `

        <div class="transaction-row">

            <div>${expense.Description}</div>

            <div>${expense.Category}</div>

            <div>${expense.Date}</div>

            <div>₹${expense.Amount}</div>

            <div>${expense.PaymentMethod}</div>

        </div>

        `;
    });
}

displayTransactions(expenses);

searchBox.addEventListener("keyup", () => {

    let searchText =
    searchBox.value.toLowerCase();

    let filteredExpenses =
expenses.filter((expense) =>

    (expense.Description || "")
    .toLowerCase()
    .includes(searchText)

    ||

    (expense.Category || "")
    .toLowerCase()
    .includes(searchText)

);

    displayTransactions(filteredExpenses);

});