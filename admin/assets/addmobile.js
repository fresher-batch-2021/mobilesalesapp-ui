$(document).ready(function(){
    console.log("jquery loaded");
    $("#addMobiles").submit(addMobileForm);
});
function addMobileForm(){
    event.preventDefault();
    const brandName = $("#brandName").val();
    const modelName= $("#modelName").val();
    const imageUrlFilePath= $("#imageUrl").val();
    const imageUrl = imageUrlFilePath.substring(imageUrlFilePath.lastIndexOf("\\")+1);
    const ram= $("#ram").val();
    const modelConfiguration= $("#modelConfiguration").val();
    const Quantity= $("#totalQuantity").val();
    const modelPrice = $("#modelPrice").val();
    const status= $("#status").val();
    
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
       
        adminProductService.addMobiles(mobileObj).then(res=>{
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