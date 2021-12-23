const bcrypt = require('bcrypt');
const db = require('../../config/db');

module.exports = {
    
    async createUserHash(name, lastName, email, password, age, departament) {
        var status = 201;

        if (name && lastName && email && password) {
            await db.column ('email').where('email', email).select().from('users')
                .then(data=>{
                    if(data.length > 0){
                        status = 409;
                    } else {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, (err, hash) => {
                                if (err) {
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
                                        }
                                    })
                                    .catch(err => {
                                        status = 502;
                                        console.error(err);
                                        throw new Error(err);
                                    });
                                }
                            }); 
                        });
                    }
                });     
        } else {
            status = 400;
        }

        return status;
    },

    decodePassword (password) {
        return bcrypt.hashSync(password, password_user);
    }

}