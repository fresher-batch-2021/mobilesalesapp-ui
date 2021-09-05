console.log(window.location.search.substr(1));
const Params = new URLSearchParams(window.location.search.substr(1));
console.log(Params);

let id = Params.get("_id");
let product = Params.get("productName");
let productUrl = Params.get("productUrl");
let productConfiguration = Params.get("productConfiguration");
let productBrand = Params.get("productBrand");
let productPrice = Params.get("productPrice");
let totalQuantity = Params.get("totalQuantity");


console.log("_id :", id);
console.log("productName :", product);
console.log("productUrl :", productUrl);
console.log("productConfiguration :", productConfiguration);
console.log("productBrand :", productBrand);
console.log("productPrice :", productPrice);
console.log("totalQuantity :", totalQuantity);

document.querySelector(".product-description").innerHTML = `
            <span>${product}</span> 
                <h1>${productBrand}</h1>
                <p> ${productConfiguration}</p>
                `;

document.querySelector("#productImage").innerHTML = `
                <img data-image="red" class="active" src="images/${productUrl}" alt="${productBrand}">`;

document.querySelector(".product-price").innerHTML = `
         <span>${productPrice}</span>
         
         
         `;
document.querySelector("#buy-btn").innerHTML = `         
         <button onclick="addButton('${id}','${totalQuantity}')" class="cart-btn" >Buy Now</button>
         `;


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
    productService.totalQantity(array, a._id, a._rev).then(res => {
      alert("done");
    }).catch(err => {
      alert("error in deleting");
    })
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
        window.location.href = "#";
      }
    });
  });
}
//?productName=" + product + "&productUrl=" + productUrl + "&productConfiguration= " + productConfiguration + "&productBrand= " + productBrand + "&productPrice= " + productPrice;