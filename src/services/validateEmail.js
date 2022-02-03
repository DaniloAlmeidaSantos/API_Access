const db = require("../../config/db");

class validations { 
    constructor(email, id) {
        this.email = email;
        this.id = id;
    }

    async validateEmail() {
        var result = true;
        
        await db.select().where("US_EMAIL", this.email).table("JB_USERS")
        .then(data => {
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const element = data[key];
                    if (element.US_ID != this.id) {
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