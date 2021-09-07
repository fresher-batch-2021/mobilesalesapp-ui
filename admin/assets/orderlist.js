function shoppingCart() {
    let content = "";
    console.log("shoping cart");
    const dbUsername = "apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4";
    const dbPassword = "3589b77ff4cc367d60ae67e1f7dada03";

    const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

    const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_my_orders/_all_docs?include_docs=true";

    axios.get(url, { headers: { 'Authorization': basicAuth } }).then(res => {

        console.log(res.data);

        let getData = res.data.rows.map((obj) => obj.doc);
        console.log(getData)
        console.log("value", getData);
        for (let data of getData) {
            console.log(data);
            content = content +
                ` <tr>
          <td><img class="product-image" src="images/${data.productUrl}" alt="no image" width="100px" height="100px"></td>
          <td>${data.productName}</td>
          <td>${data.productBrand}</td>
          <td>${data.productPrice}</td>
          <td>${data.name}</td>
          <td>${data.status}</td>
          <td><button class="approve-btn" onclick="changeStatus('${data.user}','${data.productUrl}','${data.productName}','${data.productConfiguration}','${data.productBrand}','${data.productPrice}','${data._id}','${data._rev}')">approve</button></td>
          </tr>`;
            console.log(content);
        }
        document.querySelector("#shoppingCart").innerHTML = content;
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

    const dbUsername = "apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4";
    const dbPassword = "3589b77ff4cc367d60ae67e1f7dada03";

    const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

    const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_my_orders/" + id + "?rev=" + rev;

    axios.put(url, cartProduct, { headers: { 'Authorization': basicAuth } }).then(res => {
        console.log("update status : " + res.data);
        toastr.success("Updated");
    }).catch(err => {
        console.log(err);
        toastr.error("failed");
    })
}

