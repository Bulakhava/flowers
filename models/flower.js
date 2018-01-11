const mongoose = require('mongoose');

let flowerSchema = new mongoose.Schema({
	
	name:{
		type:String,
		required:true
	},
	alias:{
		type:String,
		required:true
	},
	img:{
		type:String,
		required:true
	},
	description:{
		type:String
	},
	pict:{
		type:Array
	},
    isSorts:{
    	type:Boolean,
		required:true
    }
	
});

module.exports = mongoose.model('Flower', flowerSchema);