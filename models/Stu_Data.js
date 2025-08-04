const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");
const { type } = require('../schema/contentschema');

const Userschema = new mongoose.Schema({
   name:{
      type:String,
      require:true,
   },
         course: {
            type:String,
            require:true
         },

         semister: {
            type:Number,
            require:true,
           
         },
       
});


Userschema.plugin(passportLocalMongoose);
const User = mongoose.model("User",Userschema);
module.exports= User;