const productTemplate = (mobiles)=>{
    let content = `
    <div class="maincard">
    <div class="maincardrow">
    <div class="card">
    <img class"product-img" src="asset/images/${mobiles.imageUrl}" alt="${mobiles.brandName}">
    <h1>${mobiles.brandName}</h1>
    <h3>${mobiles.modelName}</h3>
    <p class="price">${mobiles.modelPrice}</p>
    <p><button type="button" onclick="passValue('${mobiles.modelName}','${mobiles.imageUrl}','${mobiles.modelPrice}','${mobiles.modelConfiguration}','${mobiles.brandName}','${mobiles._id}','${mobiles.totalQuantity}','${mobiles.ram}')">View Specifications</button></p>
    </div>
    </div>
    </div>
    `;
    return content;
  };

function getMobiles(brandName = null) {
    let content = "";


    // if value is null show all products
    if (brandName == null) {

        productService.getAllProducts().then(res => {

            const data = res.data.rows.map(obj => obj.doc);
            console.log(data);

            const orderedData = _.sortBy(data, 'modelPrice');
            let i = 0
            for (const mobiles of orderedData) {
                if (i % 4 == 0) {
                    content = content + "<div class='row'>";
                }
                i++;

                content = content + productTemplate(mobiles);

                if (i % 4 == 0) {
                    content = content + "</div>";
                }
            }
            console.log(content);
           $("#products").html(content);
        }).catch(err => {
            console.log(err);
            toastr.error("oops! sorry couldn't get server");
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
            const data = res.data.docs;
            console.log(data);

            let i = 0
            for (const mobiles of data) {
                if (i % 4 == 0) {
                    content = content + "<div class='row'>";
                }
                i++
                content = content + productTemplate(mobiles);
                    
                if (i % 4 == 0) {
                    content = content + "</div>";
                }
                console.log(content);
                $("#products").html(content);
            }
        }).catch(err => {
            console.log(err);
        })
    }
}
//get url values from home page and shows the values
const Params = new URLSearchParams(window.location.search.substr(1));
console.log(Params);
const value = Params.get("value");
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
    getMobiles();
}


//sorting buttons
function dropDown() {
    document.getElementById("myDropDown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropBtn')) {
        const dropdowns = document.getElementsByClassName("dropDown-content");
        let  i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}



//sorting
function sorting(n, m) {

    productService.getAllProducts().then(res => {
        const data = res.data.rows.map(obj => obj.doc);
        console.log(data);
        let content = "";
        let i = 0;
        for (const mobiles of data) {
            if (mobiles.modelPrice > n && mobiles.modelPrice < m) {

                if (i % 4 == 0) {
                    content = content + "<div class='row'>";
                }
                i++;

                content = content + productTemplate(mobiles);
                if (i % 4 == 0) {
                    content = content + "</div>";
                }
            }
        }
        $("#products").html(content);
    });
}


//view specification button
function passValue(modelName, imageUrl, modelPrice, modelConfiguration, brand, id, totalQuantity, ram) {
    console.log(passValue);
    if (totalQuantity <= 0) {
        toastr.info("", "No stock", {
            timeOut: 1000,
            positionClass: 'toast-top-center',
            preventDuplicates: true
        });
    } else {
        window.location.href = "buy.html?productName=" + brand + "&productUrl=" + imageUrl + "&productConfiguration=" + modelConfiguration + "&productBrand= " + modelName + "&productPrice=" + modelPrice + "&_id=" + id + "&totalQuantity=" + totalQuantity + "&ram=" + ram;
    }
}

