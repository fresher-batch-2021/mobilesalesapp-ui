
function editDetails() {
    const queryString = window.location.search.substr(1);
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    console.log(id);

    adminProductService.getProduct(id).then(res => {
        console.log(res.data);

        const mobileDetails = res.data;
        $("#id").val(mobileDetails._id);
        $("#rev").val(mobileDetails._rev);
        $("#brandName").val(mobileDetails.brandName);
        $("#ram").val(mobileDetails.ram);
        $("#modelName").val( mobileDetails.modelName);
        $("#modelPrice").val(mobileDetails.modelPrice);
        $("#modelConfiguration").val(mobileDetails.modelConfiguration);
        $("#status").val(mobileDetails.status);
        $("#totalQuantity").val(mobileDetails.totalQuantity);

    }).catch(err => console.error(err));
}

$("#editMobile").submit(updateDetails);
function updateDetails() {
event.preventDefault();
    const id = $("#id").val();
    const rev = $("#rev").val();
    const brandName = $("#brandName").val();
    const imageUrl = $("#imageUrl").val();
    const ram = $("#ram").val();
    const modelName = $("#modelName").val();
    const modelPrice = $("#modelPrice").val();
    const modelConfiguration = $("#modelConfiguration").val();
    const status = $("#status").val();
    const totalQuantity = $("#totalQuantity").val();
    
    let modifyDetails = {
        "id":id,
        "rev":rev,
        "brandName": brandName,
        "imageUrl": imageUrl,
        "modelName": modelName,
        "ram": ram,
        "modelConfiguration": modelConfiguration,
        "modelPrice": modelPrice,
        "#status": status,
        "totalQuantity": totalQuantity
    }
    console.log(modifyDetails);

    console.log(id,rev);
    adminProductService.updateProduct(id,rev,modifyDetails).then(res =>{
        console.log(modifyDetails)
        toastr.success("successfull");
        setTimeout(function () {
            window.location.href = "listmobile.html"
        }, 1500);
        
    }).catch(err => toastr.error("error"))
}
editDetails();
