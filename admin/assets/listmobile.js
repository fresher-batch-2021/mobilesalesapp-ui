function listMobile() {
    console.log("list Mobiles");

    const dbUsername = 'apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4';
    const dbPassword = '3589b77ff4cc367d60ae67e1f7dada03';
    const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

    const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_products/_all_docs?include_docs=true";

    axios.get(url, { headers: { Authorization: basicAuth } }).then(res => {
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
    for (let mobileObj of mobiles) {

        let imageUrl = "images/" + mobileObj.imageUrl;
        content += `<tr>
        <td>${i++}</td>
        <td><img src="${imageUrl}" alt="${imageUrl}" width="100px" height="100px"></td>
        <td>${mobileObj.brandName}</td>
        <td>${mobileObj.modelName}</td>
        <td>Rs.${mobileObj.modelPrice}</td>
        <td>${mobileObj.modelConfiguration}</td>
        <td>${mobileObj.status}</td>
        <td>        
        <a href='edit.html?id=${mobileObj._id}'><button type="button"  class="edit-btn">Edit</button></a>
        <button class="delete-btn" onClick="deleteMobile('${mobileObj._id}','${mobileObj._rev}')">Delete</button>
        </td>
        </tr>`;
    }
    console.log(content);
    document.querySelector("#list-Mobile").innerHTML = content;
}
listMobile();

