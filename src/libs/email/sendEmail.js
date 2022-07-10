const db = require("../../../config/db");
const axios = require("axios");

module.exports = {
    async sendEmailHTMLTemplate(userId, code) {
        try {
            const { data } = await axios.post(process.env.URL_API_EMAIL + userId, {
                subject: process.env.SUBJECT_EMAIL,
                htmlPath: process.env.PATH_EMAIL_HTML,
                variables: [
                    {
                        key: "code",
                        value: code
                    }
                ]
            });
            
            return data.statusCode;
        } catch (error) {
            console.error(error);
        }
    },

    async updateStatusHistoric(id) {
        var isValid = false;

        await db.update({HE_STATUS: "V"}).where("HE_ID", id).then(data => {
            isValid = (data.length > 0) ? true : false;
        });

        return isValid;
    }
};