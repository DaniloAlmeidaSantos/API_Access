const bcrypt = require('bcrypt');
const db = require('../../config/db');

module.exports = {
    async login(email, password) {
        var status = 200;

        if (email && password) {
            await db.column('email', 'password', 'id').where('email', email).select().from('users')
                .then(data => {
                    var correct;

                    if (data.length <= 0) {
                        status = 400;
                    } else {
                        console = bcrypt.compareSync(password, data[0].password);

                        if (!correct) {
                            status = 401;
                        } 
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