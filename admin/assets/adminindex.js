function checkLogin() {

    let userStr = localStorage.getItem("LOGGED_IN_USER");
    let user = userStr != null ? JSON.parse(userStr) : null;
    if (user != null) {
        document.querySelector("#loggedIn").innerHTML = "Hi! " + user.name;
    }
}
checkLogin();

