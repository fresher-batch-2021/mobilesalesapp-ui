function shoppingCart() {
    let content = "";
    let useData = localStorage.getItem("productElements");
    let userData = JSON.parse(useData);
    console.log(userData);


    content = content + `<div >
        <img class="product-image" src="images/${userData[0].productUrl}" alt="no image">
      </div>
   
      <div class="description">
        <span>${userData[0].productName}</span>
        <span>${userData[0].productBrand}</span>
        <span></span>
      </div>
      <div class="total-price">${userData[0].productPrice}</div>`;
    console.log(content);
    document.querySelector("#shoppingCart").innerHTML = content;
}
// }).catch(err => {
//     console.log(err);
// })


shoppingCart();