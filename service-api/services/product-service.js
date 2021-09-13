class productService {

    //get each brand products
    static getProduct(requestData) {
        const url = endPoint+"mobilesalesapp_products/_find";
        return axios.post(url, requestData, { headers: { Authorization: basicAuth } });

    }
    static totalQuantity(requestData, id, rev) {
        const url = endPoint+"mobilesalesapp_products/";
        return axios.put(url + id + "?rev=" + rev, requestData, { headers: { Authorization: basicAuth } });

    }

    //get all products
    static getAllProducts() {
        const Url = endPoint+"mobilesalesapp_products/_all_docs?include_docs=true";
        return axios.get(Url, { headers: { Authorization: basicAuth } });

    }

    //store datas in my orders DB
    static placeOrder(obj) {

        const url = endPoint+"mobilesalesapp_my_orders";
        return axios.post(url, obj, { headers: { 'Authorization': basicAuth } });
    }
    //checkoutn page
    static shippingData(requestgetdata) {
        const url = endPoint+"mobilesalesapp_my_orders/_find";
        return axios.post(url, requestgetdata, { headers: { 'Authorization': basicAuth } });
    }

    //cart page
    static userCart(){
        const url = endPoint+"mobilesalesapp_products/_find";
        const requestgetdata = {
            selector: {
              'user': user
            },
          }
      return axios.post(url, requestgetdata, {headers: {'Authorization': basicAuth}});
    }
    static updateShippingData(id, rev, shippingProduct) {
        const url = endPoint+"mobilesalesapp_my_orders/" + id + "?rev=" + rev;
        return axios.put(url, shippingProduct, { headers: { 'Authorization': basicAuth } });
    }
            //delete button
    static cancelOrder(id) {
        const url = endPoint+"mobilesalesapp_my_orders/" + id;
        return axios.get(url, { headers: { 'Authorization': basicAuth } });
    }
            //status update
    static cancelStatus(id, product) {
        const url = endPoint+"mobilesalesapp_my_orders/" + id;
        return axios.put(url, product, { headers: { 'Authorization': basicAuth } });
    }
    static userOrder(requestgetdata){
        const url = endPoint+"mobilesalesapp_my_orders/_find";
        return axios.post(url, requestgetdata, {headers: {'Authorization': basicAuth}});
    }
}
