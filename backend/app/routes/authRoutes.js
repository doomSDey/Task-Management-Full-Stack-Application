const { checkForDuplicateEmail } = require('../middleware');
const authController = require('../controllers').auth;
const router = require('express').Router();

router.post(
    '/signup',
    [checkForDuplicateEmail],
    authController.signUp
);

router.post('/signin', authController.signIn);

module.exports = router;
