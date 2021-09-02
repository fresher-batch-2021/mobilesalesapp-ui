const dbUsername = "apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4";
const dbPassword = "3589b77ff4cc367d60ae67e1f7dada03";

const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

class productService {

    //get each brand products
    static getProduct(requestData) {
        const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_products/_find";
        return axios.post(url, requestData, { headers: { Authorization: basicAuth } });

    }

    //get all products
    static getAllProducts() {
        const Url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_products/_all_docs?include_docs=true";
        return axios.get(Url, { headers: { Authorization: basicAuth } });

    }

    //store datas in my orders DB
    static sendData(obj) {

        const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_my_orders";
        return axios.post(url, obj, { headers: { 'Authorization': basicAuth } });
    }
    //checkoutn page
    static shippingData(requestgetdata){
       const  url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_my_orders/_find";
         return axios.post(url, requestgetdata, { headers: { 'Authorization': basicAuth } });
    }

    static updateShippingData(id,rev,shippingProduct){
        const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_my_orders/" + id + "?rev=" + rev;
        return axios.put(url, shippingProduct, { headers: { 'Authorization': basicAuth } });
    }

    static cancelOrder(id){
        const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_my_orders/"+id;
        return axios.get(url, { headers: {'Authorization': basicAuth}});
    }
 
    static cancelStatus(id, product){
        const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_my_orders/"+id;
        return axios.put(url, product, { headers: {'Authorization': basicAuth}});
}
}