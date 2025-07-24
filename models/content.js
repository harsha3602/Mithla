const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const contentschema = new mongoose.Schema({
   
           
        name: {
            type:String,
           
         },
         course: {
            type:String,
            
         },

         semister: {
            type:Number,
          
         },
         content: {
            type:String,
            require:true
         },
         
})

const Content = mongoose.model("Content", contentschema);
module.exports=  Content;