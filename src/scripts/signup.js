function createAccount(){

    let username =
    document.getElementById("username").value;

    let phone =
    document.getElementById("phone").value;

    let password =
    document.getElementById("password").value;

    let confirmPassword =
    document.getElementById("confirmPassword").value;

    if(
        username === "" ||
        phone === "" ||
        password === "" ||
        confirmPassword === ""
    ){

        alert("Please fill all fields");
        return;
    }

    if(password !== confirmPassword){

        alert("Passwords do not match");
        return;
    }

    let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];

    let existingUser =
    users.find(
        user => user.phone === phone
    );

    if(existingUser){

        alert(
        "An account already exists with this phone number"
        );

        return;
    }

    if(phone.length !== 10){

    alert("Enter valid 10 digit phone number");
    return;
}

    users.push({

        username: username,
        phone: phone,
        password: password

    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    localStorage.setItem(
    "username",
    username
);

localStorage.setItem(
    "currentUser",
    phone
);

alert("Account Created Successfully");

window.location.href =
"login.html";
}