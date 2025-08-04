const mongoose=require("mongoose")
const Schema= mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");



main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/StudentData");
}

 const collegeformschema =new Schema({
 username:{
    type:String,
    require:true,
 },

 password:{
    type:String,
    require:true,
 }

 })

 collegeformschema.plugin(passportLocalMongoose);
const Collegeform = mongoose.model("Collegeform",collegeformschema);
module.exports= Collegeform;


const addinfo =async()=>{
   let collegeform = new Collegeform({
    username:"acetcollege",
  
})
 let registerUser = await Collegeform.register(collegeform,"acet12345678");
}
addinfo()