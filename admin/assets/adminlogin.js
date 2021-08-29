function adminlogin() {

    event.preventDefault();
    const UserName = "admin1234";
    const Password = "mobhubadmin";
   
    let name = document.querySelector("#name").value;
    let password = document.querySelector("#password").value;
    console.log(name + "+" + password);
    let adminLoginValues = {
        "name": name,
        "password": password
    };
    console.log(adminLoginValues);
    if (name == "" || name == null || name.trim == "") {
        alert("Email Cannot Be Blank");
    }
    else if (password.length <= 6) {
        alert("Password Atleast Contains 6 Characters");
    }
    else if (name != UserName && password != Password) {
        alert("Invalid Email or Password");
    }
    else {
        console.log(adminLoginValues)
        alert("Login Successful");
                localStorage.setItem("LOGGED_IN_USER", JSON.stringify(adminLoginValues));
                alert("login successful");
        window.location.href = "adminindex.html";
    }
}
