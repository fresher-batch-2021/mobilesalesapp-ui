function checkLogin() {

    let userStr = localStorage.getItem("LOGGED_IN_ADMIN");
    let user = userStr != null ? JSON.parse(userStr) : null;
    if (user != null) {
        document.querySelector("#loggedIn").innerHTML = "Welcome " + user[0].email;
    }
}
checkLogin();

function logout() {
    localStorage.clear();
    window.location.reload();
    window.location.href = "adminlogin.html"
}