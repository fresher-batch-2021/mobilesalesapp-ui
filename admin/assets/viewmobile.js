function viewMobile(mobileId) {
    console.log("view mobile", mobileId);
    if (mobileId == null) {
      toastr.error("Mobile Id is mandatory");
    } else {
      const url =
        "https://product-mock-api.herokuapp.com/movieapp/api/v1/movies/" +
        mobileId;
      axios
        .get(url)
        .then((res) => {
          const mobileObj = res.data;
          displayMobile(mobileObj);
        })
        .catch((err) => {
          console.error(err.response);
          console.log("Unable to delete mobiles" + mobileId);
        });
    }
  }
  
  function displayMobile(mobileObj){
    let content = `<tr><td>${mobileObj.brandName}</td><td>${mobileObj.modelName}</td><td>${mobileObj.imageUrl}</td></tr>`;
    console.log(content);
  }
  viewMobile();