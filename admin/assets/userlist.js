function userList() {
    let content = " ";

     const dbUsername = "apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4";
     const dbPassword = "3589b77ff4cc367d60ae67e1f7dada03";

     const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

     const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_users/_all_docs?include_docs=true";

     axios.get(url, { headers: { 'Authorization': basicAuth } }).then(res => {

        console.log(res.data);

        getData = res.data.rows.map((obj) => obj.doc);
        console.log("value", getData)
        for (let data of getData) {
            console.log(data);
            content = content +
                ` <tr>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.password}</td>
                </tr>`;

            console.log(content);

        }
        document.querySelector("#userList").innerHTML = content;
    });

}
userList();






