console.log(window.location.search.substr(1));
const Params = new URLSearchParams(window.location.search.substr(1));
console.log(Params);

const id = Params.get("_id");
const product = Params.get("productName");
const productUrl = Params.get("productUrl");
const ram = Params.get("ram");
const productConfiguration = Params.get("productConfiguration");
const productBrand = Params.get("productBrand");
const productPrice = Params.get("productPrice");
const totalQuantity = Params.get("totalQuantity");


console.log("_id :", id);
console.log("productName :", product);
console.log("productUrl :", productUrl);
console.log("productConfiguration :", productConfiguration);
console.log("ram :", ram);
console.log("productBrand :", productBrand);
console.log("productPrice :", productPrice);
console.log("totalQuantity :", totalQuantity);


const productDescription = `
<span>${product}</span> 
    <h1>${productBrand}</h1>
    <p> ${productConfiguration}</p>
    `;
$(".product-description").html(productDescription);

const productImg = `
<img data-image="red" class="active" src="images/${productUrl}" alt="${productBrand}">
`;
$("#productImage").html(productImg);

const productRate = `
<span>${productPrice}</span>         
`;
$(".product-price").html(productRate);

const productVariant = `
<button type"button">${ram}GB</button>
`;
$("#choose-variant").html();

const buyButton = `         
<button type="button" onclick="addButton('${id}','${totalQuantity}','${ram}')" class="cart-btn" >Buy Now</button>
`;
$("#buy-btn").html(buyButton);



const userData = localStorage.getItem("LOGGED_IN_USER");
const user = JSON.parse(userData);
console.log(user)


const cartProduct = {
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
    const a = res.data.docs[0];

    const array = {
      "imageUrl": a.imageUrl,
      "brandName": a.brandName,
      "modelName": a.modelName,
      "modelPrice": a.modelPrice,
      "ram": a.ram,
      "modelConfiguration": a.modelConfiguration,
      "totalQuantity": a.totalQuantity - 1
    }
    productService.totalQuantity(array, a._id, a._rev).then(res => {}).catch(err => {})
    localStorage.setItem("productElements", JSON.stringify(cartProduct));
    console.log(cartProduct);

    productService.placeOrder(cartProduct).then(res => {
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