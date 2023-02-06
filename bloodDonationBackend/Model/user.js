const mongoose=require('mongoose');


const UserData=mongoose.Schema({
    FirstName:String,
  });

const user=mongoose.model('UserData',UserData);
module.exports=user;