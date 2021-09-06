function deleteMobile(MobileId,revId) {
    console.log("delete movie", MobileId, revId);
    if (MobileId == null) {
      alert("Mobile Id is mandatory");
    } else {
    
    const dbUsername = 'apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4';
    const dbPassword = '3589b77ff4cc367d60ae67e1f7dada03';
    const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

    const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_products/"+MobileId+"?rev="+revId;
        console.log(url);

        Swal.fire({
          title: 'Are you sure to delete ',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )

      axios
        .delete(url,{headers:{Authorization:basicAuth}})
        .then(res => {
          // const data = res.data;
          // console.log(data);          
          console.log("Successfully Deleted");
          listMobile();
        }) 
        .catch((err) => {
          console.log(err.response.data);
          console.log("Unable to delete Mobiles" + MobileId);
        })
      }
    })

    }
  }
