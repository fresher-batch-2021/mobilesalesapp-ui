class UserService {

    //login page

    /**
     * this method invokes login user service
     * @param {*} email 
     * @param {*} password 
     * @returns 
     */

    static login(email, password, role) {

        const url = endPoint+"mobilesalesapp_users/_find";
        const requestData = {
            selector: {
                email: email,
                password: password,
                role: role
            },
            fields: ["_id", "name", "password", "role"],
        };
        return axios.post(url, requestData, {
            headers: {
                Authorization: basicAuth
            }
        });
    }
    /** this method check the existing emails
     * 
     * @param {*} email 
     * @returns 
     */
    static emailValidation(email) {
        const url = endPoint+"mobilesalesapp_users/_find";

        let requestData = {
            selector: {
                email: email
            },
            fields: ["email"]
        };
        return axios.post(url, requestData, {
            headers: {
                Authorization: basicAuth
            }
        });
    }

    //register page
    /**
     * this method invokes register user service
     * @param {*} registerValues 
     * @returns 
     */

    static register(registerValues) {
        const url = endPoint+"mobilesalesapp_users";
        return axios.post(url, registerValues, {
            headers: {
                'Authorization': basicAuth
            }
        });
    }
}