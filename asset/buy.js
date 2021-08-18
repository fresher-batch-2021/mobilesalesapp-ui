console.log(window.location.search.substr(1));
const Params = new URLSearchParams(window.location.search.substr(1));
console.log(Params);

let product = Params.get("productName");
let productUrl = Params.get("productUrl");
let productConfiguration = Params.get("productConfiguration");
let productBrand = Params.get("productBrand");
let productPrice = Params.get("productPrice");

console.log("product :", product);
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
                <img data-image="red" class="active" src="images/${productUrl}" alt="no image">
                `;
document.querySelector(".product-price").innerHTML = `
         <span>${productPrice}</span>
         `;

// adding product to cart
function addProduct() {


  console.log("check :", product);

  let addProductStr = localStorage.getItem("cartProduct");
  let cartProduct = addProductStr != null ? JSON.parse(addProductStr) : [];
  var qty = 1;


  // If item already exist, update the quantity
  let index = cartProduct.findIndex(cartProduct => cartProduct.Id == id);
  // alert(index);
  console.log(index);
  if (index != -1) {
    let productObj = cartProduct[index];
    console.log(productObj);
    productObj.Qty++;
    cartProduct[index] = productObj;
  }

  else {
    // if item not exist, add new item to cart
    let productObj = {
      "productName": product,
      "productUrl": productUrl,
      "productConfiguration": productConfiguration,
      "productBrand": productBrand,
      "productPrice": productPrice
    };
    console.log(productObj);
    cartProduct.push(productObj);
  }

  localStorage.setItem("productElements", JSON.stringify(cartProduct));

  let userData = localStorage.getItem("LOGGED_IN_USER");
  let user = JSON.parse(userData);
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
}
