const mongoose = require('mongoose');

let sortSchema = new mongoose.Schema({
	
	name:{
		type:String,
		required:true
	},
	alias:{
		type:String,
		required:true
	},
	description:{
		type:String
	},
	pict:{
		type:Array
	}
	
});

module.exports = mongoose.model('Sort', sortSchema);