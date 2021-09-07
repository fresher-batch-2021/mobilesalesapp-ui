function editDetails() {
    //console.log(id);
    const queryString = window.location.search.substr(1);
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    console.log(id);


    const dbUsername = 'apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4';
    const dbPassword = '3589b77ff4cc367d60ae67e1f7dada03';
    const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

    const url = `https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_products/${id}`;
    axios.get(url, {
        headers: {
            Authorization: basicAuth
        }
    }).then(res => {
        console.log(res.data);

        const mobileDetails = res.data;
        //console.log(mobileDetails)
        document.querySelector("#id").value = mobileDetails._id;
        document.querySelector("#rev").value = mobileDetails._rev;
        document.querySelector("#brandName").value = mobileDetails.brandName;
        // const imageUrl = mobileDetails.imageUrl.substring(mobileDetails.imageUrl.lastIndexOf("\\")+1);
        //document.querySelector("#imageUrl").value = mobileDetails.imageUrl;   
        document.querySelector("#modelName").value = mobileDetails.modelName;
        //document.querySelector("#status").value = mobileDetails.status;
        document.querySelector("#modelPrice").value = mobileDetails.modelPrice;
        document.querySelector("#modelConfiguration").value = mobileDetails.modelConfiguration;
    }).catch(err => console.error(err));
}
editDetails();

function modifyDetails() {

    let id = document.querySelector("#id").value;
    let rev = document.querySelector("#rev").value;
    let brandName = document.querySelector("#brandName").value;
    let imageUrl = document.querySelector("#imageUrl").value;
    //const imageUrl =imageUrlFullPath.substring(imageUrlFullPath.lastIndexOf("\\")+1);

    let modelName = document.querySelector("#modelName").value;
    //let status = document.querySelector("#status").value;
    let modelPrice = document.querySelector("#modelPrice").value;
    let modelConfiguration = document.querySelector("#modelConfiguration").value;

    let modifyDetails = {
        "brandName": brandName,
        "imageUrl": imageUrl,
        "modelName": modelName,
        "status": status,
        "modelConfiguration": modelConfiguration,
        "modelPrice": modelPrice
    }
    console.log(modifyDetails);

    const dbUsername = 'apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4';
    const dbPassword = '3589b77ff4cc367d60ae67e1f7dada03';
    const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);
    console.log(id);
    const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_products/"+id+"?rev="+rev;

    axios.put(url, modifyDetails, {headers: {Authorization: basicAuth}}).then(res =>{
        console.log(modifyDetails)
        toastr.success("successfull");
        setTimeout(() => {
            window.location.href = "listmobile.html"
        }, 1500);
        
    }).catch(err => toastr.error("error"))
}