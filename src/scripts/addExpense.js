document.getElementById("saveBtn").addEventListener("click", saveExpense);

function saveExpense() {

    let Amount = document.getElementById("amount").value;
    let Date = document.getElementById("date").value;
    let Category = document.getElementById("category").value;
    let Description = document.getElementById("description").value;
    let PaymentMethod = document.getElementById("paymentMethod").value;

    let currentUser =
    localStorage.getItem("currentUser");

    let expense = {
        userPhone:currentUser,
        Description: Description,
        Category: Category,
        Date: Date,
        Amount: Amount,
        PaymentMethod: PaymentMethod
    };

    let expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.push(expense);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    alert("Expense Saved Successfully!");

    window.location.href = "transaction.html";
}