let router = new (require('express').Router)();

router.get('/', (req, res, next) => {
	res.render('index.html');
});

router.get('/admin', (req, res, next) => {
	res.render('admin.html');
});

module.exports = router;