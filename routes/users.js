const express = require('express');

const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');


router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);
//using passport as a middleware to authentication
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);
//user for deleting the session
router.get('/sign-out', usersController.destroySession);

router.use('/habit', require('./habit'));

//take to forget password page
router.get('/forget-pasword', usersController.forgetPassword);
//changes the password
router.post('/reset-password', usersController.resetPassword);


module.exports = router;