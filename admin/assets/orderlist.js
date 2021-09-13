function shoppingCart() {
    let content = "";
    console.log("shoping cart");

    adminProductService.UserOrders().then(res => {

        console.log(res.data);

        let getData = res.data.rows.map((obj) => obj.doc);
        console.log(getData)
        console.log("value", getData);
        for (let data of getData) {
            console.log(data);
            $("#shoppingCart tbody").empty();
            content = content +
                ` <tr>
          <td><img class="product-image" src="images/${data.productUrl}" alt="no image" width="100px" height="100px"></td>
          <td>${data.productName}</td>
          <td>${data.productBrand}</td>
          <td>${data.productPrice}</td>
          <td>${data.name}</td>
          <td>${data.status}</td>
          <td><button type="button" class="approve-btn" onclick="changeStatus('${data.user}','${data.productUrl}','${data.productName}','${data.productConfiguration}','${data.productBrand}','${data.productPrice}','${data._id}','${data._rev}')">approve</button></td>
          </tr>`;
            console.log(content);
        }
        $("#shoppingCart tbody").append(content);
    });
}
shoppingCart();

function changeStatus(user, productUrl, product, productConfiguration, productBrand, productPrice, id, rev) {
    console.log("gfhjk");
    let cartProduct = {
        "user": user,
        "productName": product,
        "productUrl": productUrl,
        "productConfiguration": productConfiguration,
        "productBrand": productBrand,
        "productPrice": productPrice,
        "status": "deliver"
    }
    console.log("status", cartProduct);

    adminProductService.approveOrder(id,rev,cartProduct).then(res => {
        console.log("update status : " + res.data);
        toastr.success("Updated");
    }).catch(err => {
        console.log(err);
        toastr.error("failed");
    })
}

