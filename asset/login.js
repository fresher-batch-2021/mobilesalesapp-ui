function login() {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    console.log(email + "+" + password);
    let loginValues = {
        "email": email,
        "password": password
    };
    console.log(loginValues);
    if (email == "" || email == null || email.trim == "") {
        alert("incorrect email");
    }
    else if (password.length <= 6) {
        alert("password is too short");
    }
    else {

        UserService.login(email, password).then(res => {

            let data = res.data.docs;
            console.log(data);

            if (data.length == 0) {
                alert("invalid login credentials");
            } else {
                const user = data[0];
                localStorage.setItem("LOGGED_IN_USER", JSON.stringify(data));
                alert("login successful");
                window.location.href = "home.html";
            }
        }).catch(err => {
            console.log(err.response.data);
            alert("unable to login");
        });
    }
}
