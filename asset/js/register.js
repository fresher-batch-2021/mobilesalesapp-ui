$(document).ready(function(){
    console.log("jquery loaded");
    $("#register").submit(register);
});
function register() {
    event.preventDefault();
    const name = $("#name").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const role = "user";
    console.log(name + "+" + email + "+" + password);
    const registerValues = {
        "name": name.trim(),
        "email": email.trim(),
        "password": password.trim(),
        "role": role
    };

    //fields validation
    try {
        Validator.isValidString(name, "User Name Cannot Be Empty");
        Validator.isValidString(email, "Email  Cannot Be Empty");
        Validator.isValidPassword(password, "Password Cannot Be Empty");
        Validator.isValidPasswordStrength(password, "Password Cannot Be Less Than 6");

        //for backend validation and error message
        UserService.emailValidation(email).then(res => {
            const data = res.data.docs[0];
            console.log(data)
            if (data != undefined) {

                toastr.error("", "email already exist enter different email");
                setTimeout(function () {}, 1000)
            } else {

                UserService.register(registerValues).then(res => {
                    localStorage.setItem("LOGGED_IN_USER", JSON.stringify(res.data));
                    toastr.success("", "registration successful");

                    setTimeout(function () {
                        window.location.href = "index.html";
                    }, 1000);
                }).catch(err => {
                    toastr.error("Registration Failed");
                });
            }
        });
    } catch (err) {
        console.error(err.message);
        toastr.error(err);
    }
}