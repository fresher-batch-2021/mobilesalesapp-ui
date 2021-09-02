function getMobiles(brandName) {
    let content = "";

    // if value is null show all products
    if (brandName == "null") {
        console.log("if");

        productService.getAllProducts().then(res => {

            let data = res.data.rows.map(obj => obj.doc);
            console.log(data);

            let orderedData = _.sortBy(data, 'modelPrice');
            let i = 0
            for (let oneplus of orderedData) {

                if (i % 4 == 0) {
                    content = content + "<div class='row'>";
                }
                i++;

                content = content + ` 
                <div class="maincard">
                <div class="maincardrow">
                <div class="card">
                <img src="images/${oneplus.imageUrl}" alt="oneplus" style="width:100%">
                <h1>${oneplus.brandName}</h1>
                <h3>${oneplus.modelName}</h3>
                <p class="price">${oneplus.modelPrice}</p>
                <p>${oneplus.modelConfiguration}</p>
                <p><button type="button" onclick="passValue('${oneplus.modelName}','${oneplus.imageUrl}','${oneplus.modelPrice}','${oneplus.modelConfiguration}','${oneplus.brandName}')">View Specifications</button></p>
                </div>
                </div>
                </div>
                `;
                if (i % 4 == 0) {
                    content = content + "</div>";
                }
            }
            console.log(content);
            document.querySelector("#products").innerHTML = content;
        }).catch(err => {
            console.log(err);
        })
    }

    //if value is brandname show brand products
    else {
        const requestData = {

            selector: {
                brandName: brandName
            }
        }

        productService.getProduct(requestData).then(res => {
            let data = res.data.docs;
            console.log(data);


            for (let mobiles of data) {
                content = content + ` <div class="column">
                <div class="card">
                <img src="images/${mobiles.imageUrl}" alt="oneplus" style="width:100%">
                <h1>${mobiles.brandName}</h1>
                <h3>${mobiles.modelName}</h3>
                <p class="price">${mobiles.modelPrice}</p>
                <p>${mobiles.modelConfiguration}</p>
                <p><button type="button" onclick="passValue('${mobiles.modelName}','${mobiles.imageUrl}','${mobiles.modelPrice}','${mobiles.modelConfiguration}','${mobiles.brandName}')">View Specifications</button></p>
                </div>
                 </div> `;
                console.log(content);
                document.querySelector("#products").innerHTML = content;
            }
        }).catch(err => {
            console.log(err);
        })
    }
}
const Params = new URLSearchParams(window.location.search.substr(1));
console.log(Params);
let value = Params.get("value");
console.log(value);
if (value === "oneplus") {
    getMobiles('oneplus');
} else if (value === "mi") {
    getMobiles('mi');
} else if (value === "realme") {
    getMobiles('realme');
} else if (value === "vivo") {
    getMobiles('vivo');
} else {
    getMobiles('null');
}

//sorting buttons
function dropDown() {
    document.getElementById("myDropDown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropBtn')) {
        var dropdowns = document.getElementsByClassName("dropDown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

//sorting
function sorting(n, m) {

    productService.getAllProducts().then(res => {
        let data = res.data.rows.map(obj => obj.doc);
        console.log(data);
        let content = "";
        let i = 0;
        for (let oneplus of data) {
            if (oneplus.modelPrice > n && oneplus.modelPrice < m) {

                if (i % 4 == 0) {
                    content = content + "<div class='row'>";
                }
                i++;

                content = content + ` 
                <div class="maincard">
                <div class="maincardrow">
                <div class="card">
                <img src="images/${oneplus.imageUrl}" alt="oneplus" style="width:100%">
                <h1>${oneplus.brandName}</h1>
                <h3>${oneplus.modelName}</h3>
                <p class="price">${oneplus.modelPrice}</p>
                <p>${oneplus.modelConfiguration}</p>
                <p><button type="button" onclick="passValue('${oneplus.modelName}','${oneplus.imageUrl}','${oneplus.modelPrice}','${oneplus.modelConfiguration}','${oneplus.brandName}')">View Specifications</button></p>
                </div>
                </div>
                </div>
                `;
                if (i % 4 == 0) {
                    content = content + "</div>";
                }
            }
        }
        document.querySelector("#products").innerHTML = content;
    });
}

//view specification button
function passValue(modelName, imageUrl, modelPrice, modelConfiguration, brand) {
    console.log(passValue);
    window.location.href = "buy.html?productName=" + brand + "&productUrl=" + imageUrl + "&productConfiguration= " + modelConfiguration + "&productBrand= " + modelName + "&productPrice= " + modelPrice;
}