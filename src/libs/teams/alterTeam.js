const db = require("../../../config/db");
const { cnpj } = require('cpf-cnpj-validator');

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
    async alterTeam(id, team_name, team_logo, team_banner, team_CNPJ) {
        var status = 0;
        var message = "";

        function verifyField(field, field_name, typeValidation){
            if(typeValidation === 'isEmpty?'){
                if(!field){
                    message = `Field: ${field_name} is required`;
                    status = 400;
                    return [{ message: message, status: status }];

                } 
            } else if(typeValidation === 'haveLetter?'){
                if(isNaN(field)) {
                    message = `Field: ${field_name} only accept numbers`;
                    status = 400;
                    return [{ message: message, status: status }];
                    
                }
            }
        }
        
        // Verifing field
        verifyField(team_name, 'team_name', 'isEmpty?');

        // Verifing if user is logged in
        const userisLogged = await db.select(['USUID', 'USUIDTEAM']).from('WINNUSERS').where('USUID', id);
        console.log(userisLogged);

        if(!userisLogged){ message = "User is not logged in, please try again"; status = 401; return [{ message: message, status: status }] }

        // Verifing CNPJ
        const cnpjIsValid = cnpj.isValid(team_CNPJ);
        if(!cnpjIsValid){ message = "CNPJ is not valid"; status = 400; return [{ message: message, status: status }] }

        const result = await db.update({
            TEAMID: null || undefined,
            TEAMLOGO: team_logo ? team_logo : null || undefined,
            TEAMBANNER: team_banner ? team_banner : null || undefined,
            TEAMNAME: team_name,
            TEAMNAMEVERIFIED: null || undefined,
            TEAMCNPJ: team_CNPJ ? team_CNPJ : null || undefined,
            TEAMQTDPLAYERS: null || undefined,
        }).into("WINNTEAMS").where('TEAMID', userisLogged[0].USUIDTEAM);

        if(result){
            message = 'Team has been updated';
            status = 200;
            return [{ message: message, status: status }];

        }else {
            message = "There's an problem in the server, try again later";
            status = 200;
            return [{ message: message, status: status }];

        }


        return [status, message];
    }
};