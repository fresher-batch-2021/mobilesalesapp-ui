console.log(window.location.search.substr(1));
const Params = new URLSearchParams(window.location.search.substr(1));
console.log(Params);

let id = Params.get("_id");
let product = Params.get("productName");
let productUrl = Params.get("productUrl");
let ram = Params.get("ram");
let productConfiguration = Params.get("productConfiguration");
let productBrand = Params.get("productBrand");
let productPrice = Params.get("productPrice");
let totalQuantity = Params.get("totalQuantity");


console.log("_id :", id);
console.log("productName :", product);
console.log("productUrl :", productUrl);
console.log("productConfiguration :", productConfiguration);
console.log("ram :", ram);
console.log("productBrand :", productBrand);
console.log("productPrice :", productPrice);
console.log("totalQuantity :", totalQuantity);


let productDescription = `
<span>${product}</span> 
    <h1>${productBrand}</h1>
    <p> ${productConfiguration}</p>
    `;
$(".product-description").html(productDescription);

let productImg = `
<img data-image="red" class="active" src="images/${productUrl}" alt="${productBrand}">
`;
$("#productImage").html(productImg);

let productRate = `
<span>${productPrice}</span>         
`;
$(".product-price").html(productRate);

let productVarient = `
<button type"button">${ram}GB</button>
`;
$("#choose-varient").html();

let buyButton = `         
<button type="button" onclick="addButton('${id}','${totalQuantity}','${ram}')" class="cart-btn" >Buy Now</button>
`;
$("#buy-btn").html(buyButton);



let userData = localStorage.getItem("LOGGED_IN_USER");
let user = JSON.parse(userData);
console.log(user)


let cartProduct = {
  "user": user._id,
  "name": user.name,
  "productName": product,
  "productUrl": productUrl,
  "productConfiguration": productConfiguration,
  "productBrand": productBrand,
  "productPrice": productPrice,
  "status": "pending",
  "shippingName": "",
  "shippingEmail": "",
  "shippingPhone": "",
  "cardNo": "",
  "cardDate": "",
  "cardCVV": ""
}
console.log(cartProduct);


//buynow button
function addButton(id, totalQuantity) {
  console.log(id, totalQuantity);
  const requestData = {
    selector: {
      "_id": id.trim(),
    }
  }
  productService.getProduct(requestData).then(res => {

    console.log(res.data);
    console.log(res.data.docs);
    let a = res.data.docs[0];

    let array = {
      "imageUrl": a.imageUrl,
      "brandName": a.brandName,
      "modelName": a.modelName,
      "modelPrice": a.modelPrice,
      "ram": a.ram,
      "modelConfiguration": a.modelConfiguration,
      "totalQuantity": a.totalQuantity - 1
    }
    productService.totalQantity(array, a._id, a._rev).then(res => {}).catch(err => {})
    localStorage.setItem("productElements", JSON.stringify(cartProduct));
    console.log(cartProduct);

    productService.sendData(cartProduct).then(res => {
      console.log(res.data.id);
      localStorage.setItem("CartID", res.data.id);
      console.log(user);
      if (user == null) {
        console.log("user : ", user);
        toastr.error("Please Login")
        setTimeout(function () {

        }, 1500);
      } else {
        console.log("user : ", user);
        window.location.href = "checkout.html";
      }
    });
  });
}