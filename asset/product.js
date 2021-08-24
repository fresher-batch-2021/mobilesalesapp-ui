function getMobiles(brandName) {
    let content = "";

    const dbUsername = 'apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4';
    const dbPassword = '3589b77ff4cc367d60ae67e1f7dada03';
    const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

    const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_products/_find";

    if (brandName == "null") {
        console.log("if");
        const getUrl = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_products/_all_docs?include_docs=true";
        axios.get(getUrl, { headers: { Authorization: basicAuth } }).then(res => {
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
    else {
        const requestData = {

            selector: {
                brandName: brandName
            }
        }
        axios.post(url, requestData, { headers: { Authorization: basicAuth } }).then(res => {
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
}
else if (value === "mi") {
    getMobiles('mi');
}
else if (value === "realme") {
    getMobiles('realme');
}
else if (value === "vivo") {
    getMobiles('vivo');
}
else {
    getMobiles('null');
}

function passValue(modelName, imageUrl, modelPrice, modelConfiguration, brand) {
    console.log(passValue);
    window.location.href = "buy.html?productName=" + brand + "&productUrl=" + imageUrl + "&productConfiguration= " + modelConfiguration + "&productBrand= " + modelName + "&productPrice= " + modelPrice;
}

//sorting buttons
function dropDown() {
  document.getElementById("myDropDown").classList.toggle("show");
}

window.onclick = function(event) {
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

function sorting(n,m) {
    const dbUsername = 'apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4';
    const dbPassword = '3589b77ff4cc367d60ae67e1f7dada03';
    const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

    const getUrl = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_products/_all_docs?include_docs=true";
    axios.get(getUrl, { headers: { Authorization: basicAuth } }).then(res => {
        let data = res.data.rows.map(obj => obj.doc);
        console.log(data);
        let content ="";
        let i = 0;
        for (let oneplus of data) {
                if(oneplus.modelPrice > n && oneplus.modelPrice < m){

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