const bcrypt = require('bcrypt');
const db = require('../../config/db');

module.exports = {
    /**
     * Method for login the user
     * 
     * @param {String} email 
     * @param {String} password 
     * @returns 
     */
    async login(email, password) {
        var status = 200;
        var id;

        // Validating if exists content in parameters
        if (email && password) {
            await db.column('email', 'password', 'id').where('email', email).select().from('users')
                .then(data => {
                    var correct;

                    if (data.length <= 0) {
                        status = 400;
                    } else {
                        // Decrypting password
                        correct = bcrypt.compareSync(password, data[0].password);
                        
                        // Validating if decrypting ocurred success
                        if (!correct) {
                            status = 401;
                        } 

                        id = data[0].id;
                    }
                })
                .catch(err => {
                    status = 400;
                    throw new Error(err);
                });
        } else {
            status = 400;
        }

        return [status, id];
    } 
}