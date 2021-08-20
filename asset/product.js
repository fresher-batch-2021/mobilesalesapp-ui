function getMobiles(brandName) {
    let content = "";

    const dbUsername = 'apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4';
    const dbPassword = '3589b77ff4cc367d60ae67e1f7dada03';
    const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

    const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_products/_find";

    const requestData = {

        selector: {
            brandName: brandName
        }
    }

    axios.post(url, requestData, { headers: { Authorization: basicAuth } }).then(res => {
        let data = res.data.docs;
        alert("product listed successfull");
        console.log(data);

        // console.log("res", res.data.oneplusModels);

        for (let oneplus of data) {
            content = content + ` <div class="column">
            <div class="card">
            <img src="images/${oneplus.imageUrl}" alt="oneplus" style="width:100%">
            <h1>${oneplus.brandName}</h1>
            <h3>${oneplus.modelName}</h3>
            <p class="price">${oneplus.modelPrice}</p>
            <p>${oneplus.modelConfiguration}</p>
            <p><button type="button" onclick="passValue('${oneplus.modelName}','${oneplus.imageUrl}','${oneplus.modelPrice}','${oneplus.modelConfiguration}','${oneplus.brandName}')">View Specifications</button></p>
            </div>
             </div> `;
            console.log(content);
            document.querySelector("#products").innerHTML = content;
        }
    }).catch(err => {
        console.log(err);
    })

}
const Params = new URLSearchParams(window.location.search.substr(1));
console.log(Params);
let value = Params.get("value");
console.log(value);
if (value === "oneplus") {
    getMobiles('oneplus');
}
else if (value === "mi") {
    getMobiles('mi');
}
else if (value === "realme") {
    getMobiles('realme');
}

function passValue(modelName, imageUrl, modelPrice, modelConfiguration, brand) {
    console.log(passValue);
    window.location.href = "buy.html?productName=" + brand + "&productUrl=" + imageUrl + "&productConfiguration= " + modelConfiguration + "&productBrand= " + modelName + "&productPrice= " + modelPrice;
}