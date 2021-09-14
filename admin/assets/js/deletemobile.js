function deleteMobile(MobileId,revId) {
    console.log("delete movie", MobileId, revId);
    if (MobileId == null) {
      toastr.error("Mobile Id is mandatory");
    } else {
      
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

            adminProductService.deleteProduct().then(res => {        
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
