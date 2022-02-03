const bcrypt = require("bcrypt");
const db = require("../../../config/db");
const validations = require("../../services/validateEmail");

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
        var valEmailResult = true;

        const validateEmail = new validations(email, id);
        
        await validateEmail.validateEmail().then(data => {
            if (!data) {
                valEmailResult = false;
            }
        });

        await db.where("US_ID", id).select().from("JB_USERS")
            .then(data=>{
                if(data.length > 0 && valEmailResult){
                    // Ensuring encrypting the password for security
                    bcrypt.genSalt(10, (err, salt) => {

                        if (err) {
                            status = 500;
                            message = err;
                            throw new Error(err);
                        }

                        bcrypt.hash(password, salt, (err, hash) => {
                            // If not exists error, update user in databse 
                            if (err) {
                                status = 500;
                                message = `Error ${err}`;
                                throw new Error(err);
                            } else {
                                db.update(
                                    {
                                        US_NAME: (name != data[0].US_NAME) ? name : data[0].US_NAME,
                                        US_LASTNAME: (lastName != data[0].US_LASTNAME) ? lastName : data[0].US_LASTNAME,
                                        US_EMAIL: email,
                                        US_PASSWORD: hash,
                                        US_AGE: (age != data[0].US_AGE) ? age : data[0].US_AGE,
                                        US_GENRE: (genre != data[0].US_AGE) ? genre : data[0].US_AGE,
                                        US_IMAGE: (image != data[0].US_IMAGE) ? image : data[0].US_IMAGE,
                                        US_CITY: (city != data[0].US_CITY) ? city : data[0].US_CITY,
                                        US_STATE: (state != data[0].US_STATE) ? state : data[0].US_STATE,
                                        US_COUNTRY: (country != data[0].US_COUNTRY) ? country : data[0].US_COUNTRY,
                                        US_DDD: (ddd != data[0].US_DDD) ? ddd : data[0].US_DDD,
                                        US_PHONE: (phone != data[0].US_PHONE) ? phone : data[0].US_PHONE,
                                        US_COVER: (cover != data[0].US_COVER) ? cover : data[0].US_COVER,
                                        US_BIO: (bio != data[0].US_BIO) ? bio : data[0].US_COVER
                                    }, ["id"]
                                )
                                .where("US_ID", id)
                                .table("JB_USERS")
                                .then(data => {
                                    if (data.length <= 0) {
                                        status = 400;
                                        message = "User not found";
                                    }
                                })
                                .catch(err => {
                                    console.error(err);
                                    status = 502;
                                    message = `Error for consulting: ${err}`;
                                    throw new Error(err);
                                });
                            }
                        }); 
                    });
                } else {
                    status = 400;
                    message = "E-Mail exists in database, please input other e-mail.";
                }
            })
            .catch(err => {
                console.error(err);
                status = 502;
                message = `Error for consulting: ${err}`;
                throw new Error(err);
            });  

        return [status, message];
    }
};