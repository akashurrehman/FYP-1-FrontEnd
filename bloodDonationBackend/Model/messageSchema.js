const mongoose=require('mongoose');

var MessageSchema = mongoose.Schema({
    "senderID" : { type: String },
    "receiverID" : { type: String },
    "message" : { type:String },
  });

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;