const usersController = require('../controllers').users;
const { authorizeJwt } = require('../middleware');
const router = require('express').Router();

router.put('/avatar', [authorizeJwt.verifyToken], usersController.updateAvatar);
router.get('/:userId', [authorizeJwt.verifyToken], usersController.show);

module.exports = router;
