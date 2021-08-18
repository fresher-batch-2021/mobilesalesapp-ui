function register() {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    console.log(name + "+" + email + "+" + password);
    let registerValues = {
        "name": name,
        "email": email,
        "password": password
    };
    console.log(registerValues);
    if (email == "" || email == null || email.trim == "") {
        alert("invalid email");
    }
    else if (password.length <= 6) {
        alert("password is too short");
    }
    else {
        
        UserService.register(registerValues).then(res => {
            localStorage.setItem("LOGGED_IN_USER", JSON.stringify(res.data));
            alert("register successful");
            window.location.href = "index.html";
        }).catch(err => {
            alert("registration failed");
        });
    }
}