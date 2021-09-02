function shoppingCart(user) {
  let content = " ";

  const dbUsername = "apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4";
  const dbPassword = "3589b77ff4cc367d60ae67e1f7dada03";

  const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

  const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_my_orders/_find";

  const requestgetdata = {
    selector: {
      'user': user
    },
  }
  axios.post(url, requestgetdata, {
    headers: {
      'Authorization': basicAuth
    }
  }).then(res => {
    //console.log(res.data.docs)


    let useData = localStorage.getItem("LOGGED_IN_USER");
    let userData = JSON.parse(useData);
    console.log(userData);
    let getData = res.data.docs;
    console.log(getData);

    let actionCancle = getData.filter(obj => obj.status !== "inactive");
    console.log(JSON.stringify(actionCancle));
    console.table(actionCancle);

    for (let data of actionCancle) {
      console.log(data);
      console.log(userData._id, data.user)

      content = content +
        ` <tr>
        <td><img class="product-image" src="images/${data.productUrl}" alt="no image" width="100px" height="100px"></td>
        <td>${data.productName}</td>
        <td>${data.productBrand}</td>
        <td>${data.productPrice}</td>
        <td>${data.orderDate}</td>
        <td>${data.status}</td>
        <td>
        <ul>
        ${data.shippingName}
        ${data.shippingPhone}
        </ul>
        </td>
        <td><button class="cancle-btn" onclick= "deleteOrder('${data._id}','${data._rev}');">Delete </button></td>
        </tr>`;

      console.log(content);

    }
    document.querySelector("#shoppingCart").innerHTML = content;
  });
}
let useData = localStorage.getItem("LOGGED_IN_USER");
let userData = JSON.parse(useData);
shoppingCart(userData._id);

function deleteOrder(id, rev) {
  console.log(id)
  console.log(rev)

  productService.cancelOrder(id).then(res => {
    let product = res.data;
    console.log(product);

    product.status = "inactive";

    productService.cancelStatus(id, product).then(res => {
      shoppingCart();

    }).catch(err => {
      alert("error in deleting");
    });


  });
}









































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