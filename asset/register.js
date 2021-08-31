function register() {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const role= "user";
    console.log(name + "+" + email + "+" + password);
    let registerValues = {
        "name": name,
        "email": email,
        "password": password,
        "role": role
    };

    //fields validation
    try {
        Validator.isValidString(name, "User Name Cannot Be Empty");
        Validator.isValidString(email, "Email  Cannot Be Empty");
        Validator.isValidPassword(password, "Password Cannot Be Empty");
        Validator.isValidPasswordStrength(password, "Password Cannot Be Less Than 6");

        //for backend validation and error message
        UserService.register(registerValues).then(res => {
            localStorage.setItem("LOGGED_IN_USER", JSON.stringify(res.data));
            alert("register successful");
            window.location.href = "index.html";
        }).catch(err => {
            alert("registration failed");
        });
    } catch (err) {
        console.error(err.message);
        alert(err);
        alert("Unable To Register");
    }
}
