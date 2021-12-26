const bcrypt = require('bcrypt');
const db = require('../../config/db');

module.exports = {
    /**
     * Method for create user
     * 
     * @param {String} name 
     * @param {String} lastName 
     * @param {String} email 
     * @param {String} password 
     * @param {int} age 
     * @param {String} departament 
     * @returns
     */
    async createUserHash(name, lastName, email, password, age, departament) {
        var status = 201;
        var message = "User created success.";
        
        // Validating if exists content in parameters
        if (name && lastName && email && password) {
            /**
             * 1 - Calling the select for validation if exists email in table
             * 2 - If exists, no return success, and no create user
             * 3 - If not exists, return success, and create user in database
             **/ 
            await db.column ('email').where('email', email).select().from('users')
                .then(data=>{
                    if(data.length > 0){
                        status = 409;
                        message = "E-mail in body exists in database, please alter e-mail for succefull";
                    } else {
                        // Ensuring encrypting the password for security
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, (err, hash) => {
                                // If not exists error, insert in databse new user
                                if (err) {
                                    status = 400;
                                    message = `Error hash password: ${err}`;
                                    throw new Error(err);
                                } else {
                                    db.insert(
                                        {
                                            name: name,
                                            lastName: lastName,
                                            email: email,
                                            password: hash,
                                            age: age,
                                            departament: departament
                                        }
                                    )
                                    .table('users')
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
                    }
                });     
        } else {
            status = 400;
            message = "Required parameters not filled in.";
        }

        return [status, message];
    }
}