const router = new (require('express').Router)();
const Article = require('../models/article');

router.post('/add-article',  (req, res, next) => {

	let newArticle = new Article({
		title:req.body.title,
		img:req.body.img,
		text:req.body.text
	});

   newArticle.save((err, docs) => {
		if(err){
			res.send(err);
			return;
		}else{
			res.send({message:'Статья добавлена'});
		}
	});

});


router.put('/edit-article/:id', function(req, res, next){

	let article = {
		title:req.body.title,
		img:req.body.img,
		text:req.body.text
	};

     let query = {_id:req.params.id};

	Article.update(query, article, (err, docs) => {
       if(err){
			res.send(err);
		}
		res.send(docs);
	});
});


router.delete('/delete-article/:id', function(req, res, next){
	console.log(req.params.id);
	Article.remove({_id:req.params.id}, function(err, docs){
		if(err){
			res.send(err);
		}
		res.json(docs);
	});
});


router.get('/articles-list', (req, res, next) => {
	Article.find({}, (err, docs) => {
		if(err){
			res.send(err);
		}
		docs.sort(function(a,b){
			return b.date - a.date;
		});
		res.send(docs);
	});
});

router.get('/last-articles', (req, res, next) => {
	Article.find({}, (err, docs) => {
		if(err){
			res.send(err);
		}
		docs.sort(function(a,b){
			return b.date - a.date;
		});
		res.send(docs.splice(0, 3));
	});
});

router.get('/one-article/:id', (req, res, next) => {
	Article.findById(req.params.id, (err,docs) => {
		if(err){
			res.send(err);
		}
		res.send(docs);
	});
});


module.exports = router;