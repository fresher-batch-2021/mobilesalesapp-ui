$(document).ready(function(){
    console.log("jquery loaded");
    $("#checkOut").submit(shippingDetails);
});
function shippingDetails() {
    event.preventDefault();
    const name = $("#shippingName").val();
    const email = $("#shippingEmail").val();
    const phoneNo = $("#shippingPhoneNo").val();
    const cardNo = $("#shippingcardNo").val();
    const cardDate = $("#shippingCardDate").val();
    const cardCVV = $("#shippingCardCvv").val();
    console.log(name + "+" + email + "+" + phoneNo + "+" + cardNo + "+" + cardDate + "+" + cardCVV);

    let date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    date = dd + '-' + mm + '-' + yyyy;
    console.log(date);

    try {
        Validator.isValidString(name, "User Name Cannot Be Empty");
        Validator.isValidString(email, "Email  Cannot Be Empty");
        Validator.isValidNumber(phoneNo, "phone Number Name Cannot Be Empty");
        Validator.isValidNumber(cardNo, "Card Number  Cannot Be Empty");
        Validator.isValidNumber(cardCVV, "CVV  Cannot Be Empty");




        const id = localStorage.getItem("CartID");
        console.log(id)

        const requestgetdata = {
            selector: {
                "_id": id
            },
        }
        productService.shippingData(requestgetdata).then(res => {

            console.log(res.data);
            console.log(res.data.docs);

            const shippingProduct = {
                "user": res.data.docs[0].user,
                "name": res.data.docs[0].name,
                "productName": res.data.docs[0].productName,
                "productUrl": res.data.docs[0].productUrl,
                "productConfiguration": res.data.docs[0].productConfiguration,
                "productBrand": res.data.docs[0].productBrand,
                "productPrice": res.data.docs[0].productPrice,
                "orderDate": date,
                "status": "pending",
                "shippingName": name,
                "shippingEmail": email,
                "shippingPhone": phoneNo,
                "cardNo": cardNo,
                "cardDate": cardDate,
                "cardCVV": cardCVV
            }
            console.log("Updated data : ", shippingProduct);

            productService.updateShippingData(res.data.docs[0]._id, res.data.docs[0]._rev, shippingProduct).then(res1 => {
                console.log(res1.data);
                toastr.success("Updated Shipping details")
                setTimeout(function login() {
                    window.location.href = "cart.html";
                }, 1000);
            });
        });
    } catch (err) {
        console.error(err.message);
        toastr.error(err);
    }
}

function setDate() {
    const today = new Date().toJSON().substr(0, 10);
    console.log(today);
    $("#shippingCardDate").attr("min", today);

}
setDate();