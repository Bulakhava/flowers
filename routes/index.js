let router = new (require('express').Router)();

router.use(require('./home'));
router.use(require('./flowers'));
router.use(require('./sorts'));
router.use(require('./users'));
router.use(require('./comments'));
router.use(require('./articles'));

module.exports = router;