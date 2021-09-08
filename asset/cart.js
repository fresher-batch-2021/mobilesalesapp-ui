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
  axios.post(url, requestgetdata, {headers: {'Authorization': basicAuth}}).then(res => {


    let useData = localStorage.getItem("LOGGED_IN_USER");
    let userData = JSON.parse(useData);
    console.log(userData);
    let getData = res.data.docs;
    console.log(getData);
    
    //if status inactive the data will not shown on table
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
    $("#shoppingCart").html(content);
  });
}
let useData = localStorage.getItem("LOGGED_IN_USER");
let userData = JSON.parse(useData);
shoppingCart(userData._id);


// for delete btn
function deleteOrder(id, rev) {
  console.log(id)
  console.log(rev)

  Swal.fire({
    title: 'Are you sure to delete ',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )

      productService.cancelOrder(id).then(res => {
        let product = res.data;
        console.log(product);

        product.status = "inactive";

        productService.cancelStatus(id, product).then(res => {
          shoppingCart();

        }).catch(err => {
          toastr.error("error in deleting");
        });
      });
    }
  });
}