function shippingDetails() {
    event.preventDefault();
    const name = document.querySelector("#shippingName").value;
    const email = document.querySelector("#shippingEmail").value;
    const phoneNo = document.querySelector("#shippingPhoneNo").value;
    const cardNo = document.querySelector("#shippingcardNo").value;
    const cardDate = document.querySelector("#shippingCardDate").value;
    const cardCVV = document.querySelector("#shippingCardCvv").value;

    console.log(name + "+" + email + "+" + phoneNo + "+" + cardNo + "+" + cardDate + "+" + cardCVV);

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
            "productName": res.data.docs[0].product,
            "productUrl": res.data.docs[0].productUrl,
            "productConfiguration": res.data.docs[0].productConfiguration,
            "productBrand": res.data.docs[0].productBrand,
            "productPrice": res.data.docs[0].productPrice,
            "status": "pending",
            "shippingName": name,
            "shippingEmail": email,
            "shippingPhone": phoneNo,
            "cardNo": cardNo,
            "cardDate": cardDate,
            "cardCVV": cardCVV
        }
        console.log("Updated data : ", shippingProduct);

        productService.updateShippingData(res.data.docs[0]._id, res.data.docs[0]._rev, shippingProduct).then(res => {
            console.log(res.data);
            alert("Updated Shipping details")
            window.location.href = "cart.html";
        });
    });
} catch (err) {
    console.error(err.message);
    alert(err);
}
}

function setDate(){
    let today = new Date().toJSON().substr(0,10);
    console.log(today);
    document.querySelector("#shippingCardDate").setAttribute("min", today);

}
setDate();


