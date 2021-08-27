//search bar
function search() {
    let data = [
        {
            oneplus: "oneplus",
            redmi: "mi",
            realme: "realme"
        }
    ]
    let content = "";
    for (let obj of data) {
        content += ` <option value="${obj.oneplus}">${obj.oneplus}</option>
        <option value="${obj.redmi}">${obj.redmi}</option>
        <option value="${obj.realme}">${obj.realme}</option> `;
    }
    console.log(content);
    document.querySelector("#productList").innerHTML = content;
}

// search button
function searchButton() {
    console.log("navigate");
    const brand = document.querySelector("#searchList").value;

    if (brand === "oneplus") {
        window.location.href = "product.html?value=oneplus";
    }
    else if (brand === "mi") {
        window.location.href = "product.html?value=mi";
    }
    else if (brand === "realme") {
        window.location.href = "product.html?value=realme";
    }
}

// checks login & display user name
function checkLogin() {

    let userStr = localStorage.getItem("LOGGED_IN_USER");
    let user = userStr != null ? JSON.parse(userStr) : null;
    if (user != null) {
        document.querySelector("#loggedIn").innerHTML = "Welcome " + user[0].name;
    }
}
checkLogin();

// logout
function logout() {
    localStorage.clear();
    window.location.reload();
    window.location.href = "home.html"
}