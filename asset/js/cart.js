function shoppingCart(user) {
  let content = " ";

  productService.userCart().then(res => {

    const useData = localStorage.getItem("LOGGED_IN_USER");
    const userData = JSON.parse(useData);
    console.log(userData);
    const getData = res.data.docs;
    console.log(getData);
    
    //if status inactive the data will not shown on table
    const actionCancle = getData.filter(obj => obj.status !== "inactive");
    console.log(JSON.stringify(actionCancle));
    console.table(actionCancle);

    for (const data of actionCancle) {
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
        <td><button type="button" class="cancle-btn" onclick= "deleteOrder('${data._id}','${data._rev}');">Delete </button></td>
        </tr>`;

      console.log(content);

    }
    $("#shoppingCart").html(content);
  });
}
const useData = localStorage.getItem("LOGGED_IN_USER");
const userData = JSON.parse(useData);
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
        const product = res.data;
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