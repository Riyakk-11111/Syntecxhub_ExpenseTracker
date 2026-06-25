function resetPassword(){

    let username =
    document.getElementById("username").value;

    let phone =
    document.getElementById("phone").value;

    let newPassword =
    document.getElementById("newPassword").value;

    let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];

    let user =
    users.find(
        u =>
    
        u.phone === phone
    );

    if(!user){

        alert(
        "Username or Phone Number is incorrect"
        );
        return;
    }

    user.password = newPassword;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert(
    "Password Reset Successfully"
    );

    window.location.href =
    "login.html";
}