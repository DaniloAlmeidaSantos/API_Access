const bcrypt = require("bcrypt");
const db = require("../../../config/db");

module.exports = {
    /**
     * Method for altering user data
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
     * @param {int} id 
     * @param {String} ddd
     * @param {String} phone
     * @param {String} bio
     * @param {String} cover
     * @returns 
     */
    async alterUserHash(name, lastName, image, password, email, age, genre, city, state, country, ddd, phone, bio, cover, id) {
        var status = 200;
        var message = "User updated succefull";

        if (name && lastName && email && password && genre && ddd && phone && id) {
            await db.column("US_EMAIL").where("US_EMAIL", email).select().from("JB_USERS")
                .then(data=>{
                    if(data.length > 0){
                        status = 409;
                        message = "E-mail in body exists in database, please alter e-mail for succefull";
                    } else {
                        // Ensuring encrypting the password for security
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, (err, hash) => {
                                // If not exists error, update user in databse 
                                if (err) {
                                    status = 500;
                                    message = err;
                                    throw new Error(err);
                                } else {
                                    
                                    db.where("US_ID", id).update(
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
                                            US_PHONE: phone,
                                            US_COVER: (cover) ? cover : process.env.URL_COVER_IMAGE_DEFAULT,
                                            US_BIO: bio
                                        }, ["id"]
                                    )
                                    .table("JB_USERS")
                                        .then(function(data) {
                                            if (data.length <= 0) {
                                                status = 400;
                                                message = "User not found";
                                            }
                                        })
                                        .catch(err => {
                                            status = 502;
                                            message = `Error for consulting: ${err}`;
                                            throw new Error(err);
                                        });
                                }
                            }); 
                        });
                    }
                })
                .catch(err => {
                    status = 502;
                    message = `Error for consulting: ${err}`;
                    throw new Error(err);
                });   
        } else {
            status = 400;
            message = "Required parameters not filled in.";
        }

        return [status, message];
    }
};