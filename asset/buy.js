console.log(window.location.search.substr(1));
const Params = new URLSearchParams(window.location.search.substr(1));
console.log(Params);

let product = Params.get("productName");
let productUrl = Params.get("productUrl");
let productConfiguration = Params.get("productConfiguration");
let productBrand = Params.get("productBrand");
let productPrice = Params.get("productPrice");

console.log("productName :", product);
console.log("productUrl :", productUrl);
console.log("productConfiguration :", productConfiguration);
console.log("productBrand :", productBrand);
console.log("productPrice :", productPrice);

document.querySelector(".product-description").innerHTML = `
            <span>${product}</span> 
                <h1>${productBrand}</h1>
                <p> ${productConfiguration}</p>
                `;

document.querySelector("#productImage").innerHTML = `
                <img data-image="red" class="active" src="images/${productUrl}" alt="no image">`;

document.querySelector(".product-price").innerHTML = `
         <span>${productPrice}</span>
         `;

let userData = localStorage.getItem("LOGGED_IN_USER");
let user = JSON.parse(userData);
console.log(user[0]._id)


let cartProduct = {
  "user": user[0]._id,
  "productName": product,
  "productUrl": productUrl,
  "productConfiguration": productConfiguration,
  "productBrand": productBrand,
  "productPrice": productPrice,
  "status": "pending"
}

//buynow button
function addButton(product, productBrand, productUrl, productPrice, productConfiguration) {
  console.log("addButton");

  localStorage.setItem("productElements", JSON.stringify(cartProduct));
  console.log(cartProduct);

  productService.sendData(cartProduct).then(res => {
    console.log(user);
    if (user == null) {
      console.log("user : ", user);
      alert("please login");
      window.location.href = "index.html";
    }
    else {
      console.log("user : ", user);
      alert("done");
      window.location.href = "cart.html";
    }
  });
}
//?productName=" + product + "&productUrl=" + productUrl + "&productConfiguration= " + productConfiguration + "&productBrand= " + productBrand + "&productPrice= " + productPrice;