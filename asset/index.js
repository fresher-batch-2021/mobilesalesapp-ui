$(document).ready(function(){
    console.log("jquery loaded");
    $("#login").submit(login);
});
function login() {
    event.preventDefault();
    const email = $("#email").val();
    const password = $("#password").val();
    const roles = $("#role:checked").val();

    console.log(roles);

    console.log(email + "+" + password + "+" + roles);
    const loginValues = {
        "email": email,
        "password": password,
        "role": roles
    };
    console.log(loginValues);
    if (email == "" || email == null || email.trim == "") {
        toastr.error("email cannot be empty");

    } else if (password.length <= 6) {
        toastr.error("password must contains atleast 6 characters");

    } else {
       
        //call api and checks the fields
        UserService.login(email, password, roles).then(res => {

            const data = res.data.docs;
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
                if (roles == "admin") {
                    setTimeout(function () {
                        window.location.href = "admin/adminindex.html";
                    }, 1000);

                } else if (roles == "user") {
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