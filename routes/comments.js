const router = new (require('express').Router)();
const Comment = require('../models/comment');

router.post('/comments',  (req, res, next) => {

	let newComment = new Comment({
		itemId:req.body.itemId,
		userId:req.body.userId,
		userName:req.body.userName,
		text:req.body.text
	});

	newComment.save((err, docs) => {
		if(err){
			res.send(err);
			return;
		}else{
			res.send(docs);
		}
	});

});


router.get('/comments/:itemId', (req, res, next) => {
	Comment.find({itemId:req.params.itemId}, (err, docs) => {
		if(err){
			res.send(err);
		}
		docs.sort(function(a,b){
          return b.date - a.date;
		});
		res.send(docs);
	});
});

router.delete('/delete-comment/:id', function(req, res, next){
	
	Comment.remove({_id:req.params.id}, function(err, docs){
		if(err){
			res.send(err);
		}
		res.json(docs);
	});
});

module.exports = router;