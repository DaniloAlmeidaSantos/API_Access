const bcrypt = require("bcrypt");
const db = require("../../../config/db");

module.exports = {
    /**
     * Method for create user
     * 
     * @param {String} usuname 
     * @param {String} usulogo 
     * @param {String} usunickname
     * @param {Date} usudob
     * @param {String} usuemail 
     * @param {String} usupassword 
     * @returns
     */
    async createUserHash(usuname, usulogo, usunickname, usudob, usuemail, usupassword) {
        var status = 201;
        var message = "User created success.";
        
        // Validating if exists content in parameters
        if (usuname && usunickname && usuemail && usudob && usuemail && usupassword) {
            /**
             * 1 - Calling the select for validation if exists email in table
             * 2 - If exists, no return success, and no create user
             * 3 - If not exists, return success, and create user in database
             **/ 
            await db.column ("USUEMAIL").where("USUEMAIL", usuemail).select().from("WINNUSERS")
                .then(data=>{
                    if(data.length > 0){
                        status = 409;
                        message = "E-mail in body exists in database, please alter e-mail for succefull";
                    } else if (usuemail.includes("@", 1)) {
                        // Ensuring encrypting the password for security
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(usupassword, salt, (err, hash) => {
                                // If not exists error, insert in databse new user
                                if (err) {
                                    throw new Error(err);
                                } else {                                    
                                    db.insert(
                                        {
                                            USUNAME: usuname,
                                            USULOGO: (usulogo) ? usulogo : process.env.URL_IMAGE_DEFAULT,
                                            USUEMAIL: usuemail,
                                            USUNICKNAME: usunickname,
                                            USUDOB: usudob,
                                            USUPASSWORD: hash,
                                        }
                                    )
                                    .table("WINNUSERS")
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