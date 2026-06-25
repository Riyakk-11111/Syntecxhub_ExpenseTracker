function login(){

    let username =
    document.getElementById("username").value;

    let password =
    document.getElementById("password").value;

    if(username === ""){

        alert("Please enter username");
        return;
    }

    if(password === ""){

        alert("Please enter password");
        return;
    }

    let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];

    let user =
    users.find(
        u => u.username === username
    );

    if(!user){

        alert("Account Not Found");
        return;
    }

    if(user.password !== password){

        alert("Incorrect Password");
        return;
    }

    // Save current logged-in user

    localStorage.setItem(
        "username",
        user.username
    );

    localStorage.setItem(
        "currentUser",
        user.phone
    );

    window.location.href =
    "dashboard.html";
}