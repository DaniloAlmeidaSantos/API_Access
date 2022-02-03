const db = require("../../../config/db");

module.exports = {
    /**
     * Method for altering user data
     * 
     * @param {Integer} userId
     * @param {String} teamName 
     * @param {String} bio 
     * @param {String} image
     * @param {String} email 
     * @param {String} tiktok 
     * @param {String} twitter 
     * @param {String} facebook 
     * @param {String} whatsapp 
     * @param {int} id 
     * @returns 
     */
    async alterTeam(userId, teamName, bio, image, tiktok, twitter, facebook, whatsapp, id) {
        var status = 200;
        var message = "User updated succefull";

        if (teamName) {
           /**
             * 1 - Calling the select for validation if exists team name in table
             * 2 - If exists, no return success, and no create team
             * 3 - If not exists, return success, and create team in database
             **/ 
            await db.column ("TEAM_NAME").where("TEAM_NAME", teamName).select().from("JB_TEAMS")
                .then(data=>{ 
                    if(data.length > 0){
                        status = 409;
                        message = "Team name in body exists in database, please alter team name for succefull";
                    } else {                                
                        db.where({TEAM_ID: id, TEAM_ID_ADM: userId}).update(
                            {
                                TEAM_NAME: teamName,
                                TEAM_BIO: bio,
                                TEAM_IMAGE: (image) ? image : process.env.URL_IMAGE_DEFAULT,
                                TEAM_TIKTOK: tiktok,
                                TEAM_TWITTER: twitter,
                                TEAM_FACEBOOK: facebook,
                                TEAM_WHATSAPP_GROUP: whatsapp
                            }
                        )
                        .table("JB_TEAMS")
                        .then(function(data) {
                            if (data.length == 0) {
                                status = 400;
                                message = "Fail update in database.";
                            }
                        })
                        .catch(err => {
                            status = 502;
                            message = `Error on server: ${err}`;
                            throw new Error(err);
                        });
                    }
                });     
        } else {
            status = 400;
            message = "Required parameters not filled in.";
        }

        return [status, message];
    }
};