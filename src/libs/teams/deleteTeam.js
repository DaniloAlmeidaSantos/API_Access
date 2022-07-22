const db = require("../../../config/db");

module.exports = {
    /**
     * Method for create team
     * 
     * @param {Int} userId
     * @param {String} teamName 
     * @param {String} bio 
     * @param {String} image
     * @returns
     */
    async deleteTeam(id) {
        var status = 0;
        var message = "";

        // Verifing if user is logged in
        const userisLogged = await db.select(['USUID', 'USUIDTEAM']).from('WINNUSERS').where('USUID', id);
        console.log(userisLogged);

        if(!userisLogged){ message = "User is not logged in, please try again"; status = 401; return [{ message: message, status: status }] }

        const result = await db.update({ TEAMACTIVE: 'D' /* DELETED */}).into("WINNTEAMS").where('TEAMID', userisLogged[0].USUIDTEAM);

        // Removing team from user
        const result2 = await db.update({ USUIDTEAM: null }).into("WINNUSERS").where('USUID', id);

        if(result){
            message = 'Team has been deleted';
            status = 200;
            return [{ message: message, status: status }];

        }else {
            message = "There's an problem in the server, try again later";
            status = 200;
            return [{ message: message, status: status }];

        }
    }
};