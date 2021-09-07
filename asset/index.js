function login() {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const roles = document.querySelectorAll("#role");

    //check roles 
    let role;

    roles.forEach(roleRadio => {
        if (roleRadio.checked) {
            role = roleRadio.value;
        }
    });
    console.log(role);

    console.log(email + "+" + password + "+" + role);
    let loginValues = {
        "email": email,
        "password": password,
        "role": role
    };
    console.log(loginValues);
    if (email == "" || email == null || email.trim == "") {
        toastr.error("email cannot be empty");

    } else if (password.length <= 6) {
        toastr.error("password must contains atleast 6 characters");

    } else {
       
        //call api and checks the fields
        UserService.login(email, password, role).then(res => {

            let data = res.data.docs;
            console.log(data);

            if (data.length == 0) {
                toastr.error("invalid login credentials", {
                    positionClass: 'toast-top-center',
                    preventDuplicates: true
                });
            } else {
                const user = data[0];
                localStorage.setItem("LOGGED_IN_USER", JSON.stringify(user));
                toastr.success("login successful", {
                    positionClass: 'toast-top-center',
                    preventDuplicates: true

                });
                if (role == "admin") {
                    setTimeout(function () {
                        window.location.href = "admin/adminindex.html";
                    }, 1000);

                } else if (role == "user") {
                    setTimeout(function () {
                        window.location.href = "home.html"
                    }, 1000);
                }            
            }
        }).catch(err => {
            console.log(err.response.data);
            toastr.error("unable to login");
        });
    
    }
}