const  joi = require("joi");

module.exports = Userschema  = joi.object({
    data:joi.object({
       name:joi.string().required(),
         course:joi.string().required(),
          semister:joi.number().required(),
             username:joi.string().required(),
           password:joi.string().required(),
    }).required(),
    

})