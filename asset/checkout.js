function shippingDetails() {
    event.preventDefault();
    alert("hiii");
    console.log("kyhjkgjh");
    const dbUsername = "apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4";
    const dbPassword = "3589b77ff4cc367d60ae67e1f7dada03";

    const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

    const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_my_orders/_find";

    let id = localStorage.getItem("CartID");
    console.log(id)
    
    const requestgetdata = {
        selector: {
            "_id": id
        },
    }
    console.log("kyhjkgjh");
    axios.post(url, requestgetdata, { headers: { 'Authorization': basicAuth } }).then(res => {

        const name = document.querySelector("#shippingName").value;
        const email = document.querySelector("#shippingEmail").value;
        const phoneNo = document.querySelector("#shippingPhoneNo").value;
        const cardNo = document.querySelector("#shippingcardNo").value;
        const cardDate = document.querySelector("#shippingCardDate").value;
        const cardCVV = document.querySelector("#shippingCardCvv").value;
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
        console.log("kyhjkgjh");
        console.log("Updated data : "+shippingProduct);
        const dbUsername = "apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4";
        const dbPassword = "3589b77ff4cc367d60ae67e1f7dada03";

        const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

        const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_my_orders/" + res.data.docs[0]._id + "?rev=" + res.data.docs[0]._rev;
        console.log("put");
        axios.put(url,shippingProduct, { headers: { 'Authorization': basicAuth } }).then(res => {
            console.log(res.data);
            alert("Updated Shipping details")
            window.location.href = "cart.html";
        });
    });
}
//  let useData = localStorage.getItem("LOGGED_IN_USER");
//  let userData = JSON.parse(useData);
//  shoppingCart(userData[0]._id);
