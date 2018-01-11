let router = new (require('express').Router)();
const Sort = require('../models/sort');

router.get('/sorts/:alias', (req, res, next) => {
	Sort.find({alias:req.params.alias}, (err, docs) => {
		if(err){
			res.send(err);
		}
		
		res.send(docs);
	});
});

module.exports = router;