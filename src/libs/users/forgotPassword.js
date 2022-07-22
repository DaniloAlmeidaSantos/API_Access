const db = require("../../../config/db");
const { sendEmailHTMLTemplate, updateStatusHistoric } = require("../email/sendEmail");
const bcrypt = require("bcrypt");

module.exports = {
    async ForgotPassword(email) {
        try {
            var status = 200;
            var message = "Sending email for recuperation you password";
            var code = Math.random() * (9999 - 1000) + 1000;
            code = parseInt(code);
            var userId = 0;

            await db.where("USUEMAIL", email).select().table("WINNUSERS")
            .then(data => {
                
                if (data.length > 0) {
                    userId = data[0].US_ID;
                } else {
                    status = 400;
                    message = "Email not found.";
                }
            });

            const sendEmail = await sendEmailHTMLTemplate(userId, code);

            if (sendEmail == 200) {
                db.insert({
                    HE_ID_USER: userId,
                    HE_TYPE_EMAIL: "RECOVER",
                    HE_STATUS: "E",
                    HE_CODE_RECOVER: code.toString()
                })
                .table("JB_HISTORIC_EMAIL")
                .then(data => {
                    if (data.length <= 0) {
                        status = 400;
                        message = "Fail in generation code.";
                    }
                })
                .catch(err => {
                    status = 502;
                    message = `Error on server: ${err}`;
                    throw new Error(err);
                });
            } else {
                status = 400;
                message = "Error in sending email for recuperation password.";
            }

            return [status, message, userId];
        } catch (error) {
            console.error(error);
        }
    },

    async AlterPassword(password, code, id) {
        try {
            var status = 200;
            var message = "Password updated success";
            var isValid = false;
            var idHistoric = 0;
            
            await db.select()
            .whereRaw("DATE_ADD(HE_DT_SEND, INTERVAL 30 MINUTE) > NOW()")
            .andWhere("HE_CODE_RECOVER", "=", code)
            .andWhere("HE_STATUS", "=", "E")
            .table("JB_HISTORIC_EMAIL")
            .limit(1)
            .orderBy("HE_DT_SEND", "desc")
            .then(data => {
                if (data.length > 0) {
                    idHistoric = data[0].HE_ID;
                    isValid = true;
                } 
            });

            if (isValid) {
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
                            db.update({US_PASSWORD: hash}, ["id"])
                            .where("US_ID", id)
                            .table("JB_USERS")
                            .then(data => {
                                
                                const isUpdateStatus = updateStatusHistoric(idHistoric);

                                if (data.length <= 0) {
                                    status = 400;
                                    message = "User not found";
                                } else if (isUpdateStatus) {
                                    status = 500;
                                    message = "Historic not updated, error in server";
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
                message = "Interval for recover in code sending, expired, or not exists the code."; 
           }

            return [status, message];
        } catch (error) {
            console.error(error);
        }
    }
};