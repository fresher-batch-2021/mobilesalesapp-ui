function userList() {
    let content = " ";
    
    adminProductService.userList().then(res => {
        console.log(res.data);

        getData = res.data.rows.map((obj) => obj.doc);
        console.log("value", getData)
        for (const data of getData) {
            console.log(data);
            $("#userList tbody").empty();

            content = content +
                ` <tr>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.password}</td>
                </tr>`;

            console.log(content);
        }
        
        $("#userList tbody").append(content);
    });

}
userList();






