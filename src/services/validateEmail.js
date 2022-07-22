const db = require("../../config/db");

class validations { 
    constructor(email, id) {
        this.email = email;
        this.id = id;
    }

    async validateEmail() {
        var result = true;
        
        await db.select().where("USUEMAIL", this.email).table("WINNUSERS")
        .then(data => {
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const element = data[key];
                    if (element.USUID != this.id) {
                        result = false;
                    }
                }
            }
        });

        result = this.email.includes("@", 1) ? true : false;
        
        return result;
    }
}

module.exports = validations;