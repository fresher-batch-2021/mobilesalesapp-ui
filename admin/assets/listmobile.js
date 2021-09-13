function listMobile() {
    console.log("list Mobiles");

    adminProductService.getAllProducts().then(res => {
        const data = res.data.rows.map(obj => obj.doc);
        console.table(data);
        formMobileTableData(data);

    }).catch(err => {
        console.error(err.response);
        console.log("Unable to fetch Mobiles");
    })
}


function formMobileTableData(mobiles) {
    let content = "";
    let i = 1;
    for (const mobileObj of mobiles) {
        

        $("#list-Mobile tbody").empty();
        const imageUrl = "images/" + mobileObj.imageUrl;
        content += `<tr>
        <td>${i++}</td>
        <td><img src="${imageUrl}" alt="${imageUrl}" width="100px" height="100px"></td>
        <td>${mobileObj.brandName}</td>
        <td>${mobileObj.modelName}</td>
        <td>Rs.${mobileObj.modelPrice}</td>
        <td>${mobileObj.ram}GB ${mobileObj.modelConfiguration}</td>
        <td>${mobileObj.status}</td>
        <td>${mobileObj.totalQuantity}</td>

        <td>        
        <a href='edit.html?id=${mobileObj._id}'  class="edit-btn">Edit</a>
        <button type"button" class="delete-btn" onClick="deleteMobile('${mobileObj._id}','${mobileObj._rev}')">Delete</button>
        </td>

        </tr>`;
        $("#list-Mobile tbody").append(content);
    }
    console.log(content);
    
}
listMobile();


