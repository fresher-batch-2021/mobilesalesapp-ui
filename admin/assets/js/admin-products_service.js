class adminProductService {
    static getAllProducts() {
        const Url = endPoint+"mobilesalesapp_products/_all_docs?include_docs=true";
        return axios.get(Url, { headers: { Authorization: basicAuth } });
    }
    static addMobiles(mobileObj){
        const url = endPoint+"mobilesalesapp_products";
       return axios.post(url,mobileObj, {headers:{Authorization:basicAuth}});
    }
    static userList(){
        const url = endPoint+"mobilesalesapp_users/_all_docs?include_docs=true";
     return axios.get(url, { headers: { 'Authorization': basicAuth } });
    }
    static deleteProduct(){
        const url = endPoint+"mobilesalesapp_products/" + MobileId + "?rev=" + revId;
     return axios.delete(url,{headers:{Authorization:basicAuth}});
    }
    // edit page
    static getProduct(id){
        const url = endPoint+`mobilesalesapp_products/${id}`;
      return axios.get(url, {headers: {Authorization: basicAuth}});
    }
    static updateProduct(id,rev,modifyDetails){
        const url = endPoint+"mobilesalesapp_products/" + id + "?rev=" + rev;
    return axios.put(url, modifyDetails, {headers: {Authorization: basicAuth}});
    }
    // order list
    static UserOrders(){
        const url = endPoint+"mobilesalesapp_my_orders/_all_docs?include_docs=true";
    return axios.get(url, {headers: {Authorization: basicAuth}});
    }
    static approveOrder(id,rev,cartProduct){
        const url = endPoint+"mobilesalesapp_my_orders/" + id + "?rev=" + rev;
      return  axios.put(url, cartProduct, { headers: { 'Authorization': basicAuth } });
    }
}