const express = require('express');

const router = express.Router();
const { Custompase, Audiopase } = require('../models/customPase');
const { signUp, logIn, showUser, showOneUser } = require('../controllers/userController');
const { createCustomPase, showAllPases, deleteCustomPase, paseById } = require('../controllers/customPaseController');
const { userById, isAuth, requireSignIn, userFav } = require('../middleware/auth');
const { signUpValidation } = require('../middleware/validation');

router.post('/signup', signUpValidation, signUp);
router.post('/login', logIn);
router.get("/user/show", showUser);
router.get("/user/:userId", requireSignIn, isAuth, showOneUser);
router.get("/userpases/show", showAllPases)


router.post('/customPase/:userId', requireSignIn, isAuth, userFav, createCustomPase);
router.delete('/customPase/:customId', deleteCustomPase);

router.param('userId', userById);
router.param('customId', paseById);

module.exports = router;

