function addMobileForm(){
    event.preventDefault();
    const brandName = document.querySelector("#brandName").value;
    const modelName= document.querySelector("#modelName").value;
    const imageUrlFilePath= document.querySelector("#imageUrl").value;
    const imageUrl = imageUrlFilePath.substring(imageUrlFilePath.lastIndexOf("\\")+1);
    const ram= document.querySelector("#ram").value;
    const modelConfiguration= document.querySelector("#modelConfiguration").value;
    const Quantity= document.querySelector("#totalQuantity").value;
    const modelPrice = document.querySelector("#modelPrice").value;
    const status= document.querySelector("#status").value;
    const totalQuantity=parseInt(Quantity);
     addMobile(brandName,modelName,imageUrl,ram, modelConfiguration, modelPrice, status, totalQuantity);
}

function addMobile(brandName,modelName, imageUrl, ram, modelConfiguration, modelPrice, status, totalQuantity){
    console.log("AddMobile" , brandName, modelName, imageUrl, ram, modelConfiguration, modelPrice, status);
    
    try{
        Validator.isValidString(brandName, "Brand Name is Mandatory");
        Validator.isValidString(modelName, "Model Name is Mandatory");
        Validator.isValidString(imageUrl, "Mobile Image is Mandatory");
        Validator.isValidString(ram, "Mobile price is Mandatory");
        Validator.isValidString(modelConfiguration, "Mobile Configuration is Mandatory");
        Validator.isValidString(modelPrice, "Mobile Price is Mandatory");
        Validator.isValidString(status, "status is Mandatory");



        console.log("Mobile Details");
        toastr.success("Successfully Added");
        const mobileObj = { brandName:brandName, modelName:modelName, imageUrl: imageUrl, ram:ram, modelConfiguration:modelConfiguration,  modelPrice:modelPrice, status:status,totalQuantity:totalQuantity};
        console.log(mobileObj);
       
    const dbUsername = 'apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4';
    const dbPassword = '3589b77ff4cc367d60ae67e1f7dada03';
    const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

    const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_products";
       
    axios.post(url,mobileObj, {headers:{Authorization:basicAuth}}).then(res=>{
            const data = res.data;
            console.log("Response:", data);
            console.log("Successfully Added");

        }).catch(err=>{
            console.error(err.response);
            console.log("Unable to add mobile");
        })
    }
    catch(err){
        console.error(err.message);
        toastr.error("Error " + err.message);
    }
    
}