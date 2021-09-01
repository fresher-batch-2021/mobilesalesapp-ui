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
        Validator.isValidString(name, "User Name Cannot Be Empty");
        Validator.isValidString(email, "Email  Cannot Be Empty");
        Validator.isValidPassword(password, "Password Cannot Be Empty");
        Validator.isValidPasswordStrength(password, "Password Cannot Be Less Than 6");

        //for backend validation and error message
        UserService.emailValidation(email).then(res=>{
            let data = res.data.docs[0];
            console.log(data)          
            if (data!=undefined) {

                toastr.error("", "email already exist enter different email");
                setTimeout(function () {
                }, 1000)
            } else {

        
        UserService.register(registerValues).then(res => {
            localStorage.setItem("LOGGED_IN_USER", JSON.stringify(res.data));
            toastr.success("", "registration successful");

            setTimeout(function () {
                window.location.href = "index.html";
            }, 800);
        }).catch(err => {
            console.log(err.response);
            toastr.error("", "Registration failed", {
                timeOut: 1500,
            });

        });
    }
});
    }

