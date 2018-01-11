let router = new (require('express').Router)();
const Flower = require('../models/flower');

router.get('/flowers', (req, res, next) => {
	Flower.find({}, (err, docs) => {
		if(err){
			res.send(err);
		}
		docs.sort(function(a,b){
			return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
		});
		res.send(docs);
	});
});

module.exports = router;