const bcrypt = require("bcrypt");
const db = require("../../../config/db");
const validations = require("../../services/validateEmail");

module.exports = {
    /**
     * Method for altering user data
     * 
     * @param {String} logo 
     * @param {String} name 
     * @param {String} nickname
     * @param {Date} dob
     * @param {String} email
     * @param {String} password
     * @returns 
     */
    async alterUserHash(id, logo, name, nickname, dob, email, password) {
        // async alterUserHash(name, lastName, image, password, email, age, genre, city, state, country, ddd, phone, bio, cover, id) {
        var status = 200;
        var message = "User updated succefull";
        var valEmailResult = true;

        const validateEmail = new validations(email, id);
        
        await validateEmail.validateEmail().then(data => {
            if (!data) {
                valEmailResult = false;
            }
        });

        await db.where("USUID", id).select().from("WINNUSERS")
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
                                        USUNAME: (name != data[0].USUNAME) ? name : data[0].USUNAME,
                                        USUEMAIL: email,
                                        USUPASSWORD: hash,
                                        USULOGO: (logo != data[0].USULOGO) ? logo : data[0].USULOGO,
                                        USUNICKNAME: (nickname != data[0].USUNICKNAME) ? nickname : data[0].USUNICKNAME,
                                        USUDOB: (dob != data[0].USUDOB) ? dob : data[0].USUDOB,
                                    }, ["id"]
                                )
                                .where("USUID", id)
                                .table("WINNUSERS")
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