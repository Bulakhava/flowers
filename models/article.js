const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
	
	title:{
		type:String,
		required:true
	},
	img:{
		type:String,
		default: null 
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

module.exports = mongoose.model('Article', articleSchema);