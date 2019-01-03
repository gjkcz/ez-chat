const mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({  
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

  
var Message = mongoose.model("Message", MessageSchema);
module.exports = {Message};