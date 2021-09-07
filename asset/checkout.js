function shippingDetails() {
    event.preventDefault();
    const name = document.querySelector("#shippingName").value;
    const email = document.querySelector("#shippingEmail").value;
    const phoneNo = document.querySelector("#shippingPhoneNo").value;
    const cardNo = document.querySelector("#shippingcardNo").value;
    const cardDate = document.querySelector("#shippingCardDate").value;
    const cardCVV = document.querySelector("#shippingCardCvv").value;
    console.log(name + "+" + email + "+" + phoneNo + "+" + cardNo + "+" + cardDate + "+" + cardCVV);

    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    date = dd + '-' + mm + '-' + yyyy;
    console.log(date);

    try {
        Validator.isValidString(name, "User Name Cannot Be Empty");
        Validator.isValidString(email, "Email  Cannot Be Empty");
        Validator.isValidNumber(phoneNo, "phone Number Name Cannot Be Empty");
        Validator.isValidNumber(cardNo, "Card Number  Cannot Be Empty");
        Validator.isValidNumber(cardCVV, "CVV  Cannot Be Empty");




        let id = localStorage.getItem("CartID");
        console.log(id)

        const requestgetdata = {
            selector: {
                "_id": id
            },
        }
        productService.shippingData(requestgetdata).then(res => {

            console.log(res.data);
            console.log(res.data.docs);

            let shippingProduct = {
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
    let today = new Date().toJSON().substr(0, 10);
    console.log(today);
    document.querySelector("#shippingCardDate").setAttribute("min", today);

}
setDate();