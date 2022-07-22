const bcrypt = require("bcrypt");
const db = require("../../../config/db");

module.exports = {
    async deleteChampionship( id ){
        let message = '';
        let status = 0;

        // deleting championship in database 
        // const result = await db.insert({
        //     CHAMPID: null || undefined,
        //     CHAMPNAME: championship_name,
        //     CHAMPSTARTDATE: championship_start_date,
        //     CHAMPFINALDATE: championship_final_date,
        //     CHAMPCREATED: null || undefined,
        //     CHAMPAWARD: championship_award,
        //     CHAMPTYPE: championship_type,
        // }).into("WINNCHAMPIONSHIPS");

        const result = await db.into('WINNCHAMPIONSHIPS').where('CHAMPID', id).del();
        
        if(result){
            message = 'Championship has been deleted';
            status = 200;
            return [{ message: message, status: status }];
        }else {
            message = "There's an problem in the server, try again later";
            status = 400;
            return [{ message: message, status: status }];
        }
    }
};