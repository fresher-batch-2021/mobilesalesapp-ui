function adminlogin() {

    event.preventDefault();
    const UserName = "admin";
    const Email = "admin@gmail.com";
    const Password = "admin1234";
   
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    console.log(email + "+" + password);
    let adminLoginValues = {
        "email": email,
        "password": password
    };
    console.log(adminLoginValues);
    if (email == "" || email == null || email.trim == "") {
        alert("Email Cannot Be Blank");
    }
    else if (password.length <= 6) {
        alert("Password Atleast Contains 6 Characters");
    }
    else if (email != Email && password != Password) {
        alert("Invalid Email or Password");
    }
    else {
        console.log(adminLoginValues)
        alert("Login Successful");
        window.location.href = "adminindex.html";
    }
}
