const bcrypt = require('bcrypt');
const db = require('../../config/db');

module.exports = {
    /**
     * Method for altering user data
     * 
     * @param {String} name 
     * @param {String} lastName 
     * @param {String} email 
     * @param {String} password 
     * @param {int} age 
     * @param {String} departament 
     * @param {int} id 
     * @returns 
     */
    async alterUserHash(name, lastName, email, password, age, departament, id) {
        var status = 200;
        var message = "User updated succefull";

        if (name && lastName && email && password && id) {
            await db.column('email').where('email', email).select().from('users')
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
                                    db.where('ID', id).update(
                                        {
                                            name: name,
                                            lastName: lastName,
                                            email: email,
                                            password: hash,
                                            age: age,
                                            departament: departament
                                        }, ['id']
                                    )
                                    .table('users')
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
}