const bcrypt = require("bcrypt");
const db = require("../../../config/db");

module.exports = {
    
    async alterChampionship( id, championship_name, championship_start_date, championship_final_date, championship_award, championship_type ){
        const startDate = new Date(championship_start_date);
        const endDate = new Date(championship_final_date);
        const atualDate = new Date();
        let message = '';
        let status = 0;

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

        // Data validation
        if(startDate > atualDate) {
            message = 'Start Date is less than atual date';
            status = 400;
            return [{ message: message, status: status }]
        }

        if(startDate > endDate){ 
            message = 'Start Date is greater than End date';
            status = 400
            return [{ message: message, status: status }]
        }

        // Verifying if fields are null or undefined
        verifyField(championship_name, 'championship_name', 'isEmpty?');
        verifyField(championship_start_date, 'championship_start_date', 'isEmpty?');
        verifyField(championship_final_date, 'championship_final_date', 'isEmpty?');
        verifyField(championship_award, 'championship_award', 'isEmpty?');

        // Verifying if field have letter
        verifyField(championship_type, 'championship_type', 'haveLetter?');

        // Inserting championship in database 
        const result = await db.update({
            CHAMPID: null || undefined,
            CHAMPNAME: championship_name,
            CHAMPSTARTDATE: championship_start_date,
            CHAMPFINALDATE: championship_final_date,
            CHAMPCREATED: null || undefined,
            CHAMPAWARD: championship_award,
            CHAMPTYPE: championship_type,
        }).where("CHAMPID", id).into("WINNCHAMPIONSHIPS");
        
        if(result){
            message = 'Championship has been updated';
            status = 200;
            return [{ message: message, status: status }];
        }else {
            message = "There's an problem in the server, try again later";
            status = 200;
            return [{ message: message, status: status }];
        }
    }
};