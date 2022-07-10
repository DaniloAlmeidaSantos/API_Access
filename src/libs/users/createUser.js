const bcrypt = require("bcrypt");
const db = require("../../../config/db");

module.exports = {
    /**
     * Method for create user
     * 
     * @param {String} name 
     * @param {String} lastName 
     * @param {String} image
     * @param {String} email 
     * @param {String} password 
     * @param {int} age 
     * @param {String} genre 
     * @param {String} city 
     * @param {String} state 
     * @param {String} country 
     * @param {String} ddd 
     * @param {String} phone 
     * @returns
     */
    async createUserHash(name, lastName, image, password, email, age, genre, city, state, country, ddd, phone) {
        var status = 201;
        var message = "User created success.";
        
        // Validating if exists content in parameters
        if (name && lastName && email && password && genre && ddd && phone) {
            /**
             * 1 - Calling the select for validation if exists email in table
             * 2 - If exists, no return success, and no create user
             * 3 - If not exists, return success, and create user in database
             **/ 
            await db.column ("US_EMAIL").where("US_EMAIL", email).select().from("JB_USERS")
                .then(data=>{
                    if(data.length > 0){
                        status = 409;
                        message = "E-mail in body exists in database, please alter e-mail for succefull";
                    } else if (email.includes("@", 1)) {
                        // Ensuring encrypting the password for security
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, (err, hash) => {
                                // If not exists error, insert in databse new user
                                if (err) {
                                    throw new Error(err);
                                } else {                                    
                                    db.insert(
                                        {
                                            US_NAME: name,
                                            US_LASTNAME: lastName,
                                            US_EMAIL: email,
                                            US_PASSWORD: hash,
                                            US_AGE: age,
                                            US_GENRE: genre,
                                            US_IMAGE: (image) ? image : process.env.URL_IMAGE_DEFAULT,
                                            US_CITY: (city) ? city : "São Paulo",
                                            US_STATE: (state) ? state : "SP",
                                            US_COUNTRY: (country) ? country : "Brazil",
                                            US_DDD: ddd,
                                            US_PHONE: phone
                                        }
                                    )
                                    .table("JB_USERS")
                                    .then(function(data) {
                                        if (data.length == 0) {
                                            status = 400;
                                            message = "Fail insert in database.";
                                        }
                                    })
                                    .catch(err => {
                                        status = 502;
                                        message = `Error on server: ${err}`;
                                        throw new Error(err);
                                    });
                                }
                            }); 
                        });
                    } else {
                        status = 409;
                        message = "E-mail format incorrect.";
                    }
                });     
        } else {
            status = 400;
            message = "Required parameters not filled in.";
        }

        return [status, message];
    }
};