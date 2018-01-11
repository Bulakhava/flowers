const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
	itemId:{
		type:String,
		required:true
	},
	userId:{
		type:String,
		required:true
	},
	userName:{
		type:String,
		required:true
	},
	text:{
		type:String,
		required:true
	},
      date: { 
      	type: Date, 
      	default: Date.now 
      }
});

module.exports = mongoose.model('Comment', commentSchema);