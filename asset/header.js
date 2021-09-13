//search bar
function search() {
    const data = [{
        oneplus: "oneplus",
        redmi: "mi",
        realme: "realme",
        vivo: "vivo"
    }]
    const content = "";
    for (const obj of data) {
        content += ` <option value="${obj.oneplus}">${obj.oneplus}</option>
        <option value="${obj.redmi}">${obj.redmi}</option>
        <option value="${obj.realme}">${obj.realme}</option> 
        <option value="${obj.vivo}">${obj.vivo}</option> `;;
    }
    console.log(content);
    $("#productList").html(content);
}

// search button
function searchButton() {
    console.log("navigate");
    const brand = $("#searchList").val();

    if (brand === "oneplus") {
        window.location.href = "product.html?value=oneplus";
    } else if (brand === "mi") {
        window.location.href = "product.html?value=mi";
    } else if (brand === "realme") {
        window.location.href = "product.html?value=realme";
    } else if (brand === "vivo") {
        window.location.href = "product.html?value=vivo";
    }
}

// checks login & display user name
function checkLogin() {

    const userStr = localStorage.getItem("LOGGED_IN_USER");
    const user = userStr != null ? JSON.parse(userStr) : null;
    if (user != null) {
        $("#loggedIn").html("Hi!" + user.name);
    }
}
checkLogin();