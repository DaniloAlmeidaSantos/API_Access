const db = require("../../../config/db");

module.exports = {
    /**
     * Method for create team
     * 
     * @param {String} teamName 
     * @param {String} bio 
     * @param {String} image
     * @returns
     */
    async createTeam(teamName, bio, image) {
        var status = 201;
        var message = "Team created success.";
        
        // Validating if exists content in parameters
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
                        db.insert(
                            {
                                TEAM_NAME: teamName,
                                TEAM_BIO: bio,
                                TEAM_IMAGE: (image) ? image : process.env.URL_IMAGE_DEFAULT
                            }
                        )
                        .table("JB_TEAMS")
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
        } else {
            status = 400;
            message = "Required parameters not filled in.";
        }

        return [status, message];
    }
};