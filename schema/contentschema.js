const  joi = require("joi");

module.exports = contentschema = joi.object({
    data:joi.object({

           content:joi.string().required()
          
    }).required(),
    

})