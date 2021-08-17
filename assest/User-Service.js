        const dbUsername = "apikey-v2-1kdtmo28t5uulevcbb5m8mifmj5bd962vbuc18qwa0m4";
        const dbPassword = "3589b77ff4cc367d60ae67e1f7dada03";
        const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

        class UserService {

            static login(email, password){

                const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_users/_find"

        const requestData = {
          selector: {
            email: email,
            password: password
          },
          fields: ["_id", "name", "password"],
        };

        return axios.post(url, requestData, { headers: { Authorization: basicAuth } });

            }
            static register(registerValues)
            {
                const url = "https://05025f1a-856b-47a0-aadb-52e737a386f3-bluemix.cloudantnosqldb.appdomain.cloud/mobilesalesapp_users"
               return axios.post(url, registerValues, { headers: { 'Authorization': basicAuth } });
            }
        }
        
       
