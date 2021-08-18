function search() {
    let data = [
        {
            oneplus: "oneplus",
            redmi: "redmi",
            realme: "realme"
        }
    ]
    // document.getElementById("#productList").innerHTML = brands;
    // searchProducts.getProduct().then(res=>{
    let content = "";
    for (let obj of data) {
        content += ` <option value="${obj.oneplus}">${obj.oneplus}</option>
        <option value="${obj.redmi}">${obj.redmi}</option>
        <option value="${obj.realme}">${obj.realme}</option> `;
    }
    console.log(content);
    document.querySelector("#productList").innerHTML = content;

    //  });

}


function checkLogin() {

    let userStr = localStorage.getItem("LOGGED_IN_USER");
    let user = userStr != null ? JSON.parse(userStr) : null;
    if (user != null) {
        document.querySelector("#loggedIn").innerHTML = "Welcome " + user[0].name;


    }


}
checkLogin();

function logout() {
    localStorage.clear();
    window.location.reload();
    window.location.href = "index.html"
}