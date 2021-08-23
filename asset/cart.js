function shoppingCart() {
    let content = "";
    let useData = localStorage.getItem("productElements");
    let userData = JSON.parse(useData);
    console.log(userData);
    console.log(userData.productUrl);
    
      content = content + `<div >
        <img class="product-image" src="images/${userData.productUrl}" alt="no image">
        </div> 
        <div class="description">
        <span>${userData.productName}</span>
        <span>${userData.productBrand}</span>
        <span></span>
        </div>
        <div class="total-price">${userData.productPrice}</div>`;
    console.log(content);
    document.querySelector("#shoppingCart").innerHTML = content;
}
// }).catch(err => {
//     console.log(err);
// })
shoppingCart();

// adding product to cart
  // function addProduct() {
  
  // console.log("check :", product);
  // let addProductStr = localStorage.getItem("productElements");
  // let cartProduct = addProductStr != null ? JSON.parse(addProductStr) : [];
  // var qty = 1;


  // If item already exist, update the quantity
  // let index = cartProduct.findIndex(cartProduct => cartProduct.Id == id);
  // alert(index);
  // console.log(index);
  // if (index != -1) {
  //   let productObj = cartProduct[index];
  //   console.log(productObj);
  //   productObj.Qty++;
  //   cartProduct[index] = productObj;
  // }

  // else {
    // if item not exist, add new item to cart
  //   let productObj = {
  //     "productName": product,
  //     "productUrl": productUrl,
  //     "productConfiguration": productConfiguration,
  //     "productBrand": productBrand,
  //     "productPrice": productPrice
  //   };
  //   console.log(productObj);
  //   cartProduct.push(productObj);
  // }
  // }
