function saveBudget(){

    let monthlyBudget =
    document.getElementById("monthlyBudget").value;

    let yearlyBudget =
    document.getElementById("yearlyBudget").value;

    // Validation
    if(monthlyBudget === "" && yearlyBudget === ""){
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

    window.location.href = "dashboard.html";
}