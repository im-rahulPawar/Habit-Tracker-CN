const express = require('express');

const router = express.Router();
const homeContriller = require('../controllers/home_controller');

// console.log('In router');//---------------------------------------

router.get('/', homeContriller.home);
router.get('/404', homeContriller.notFound);

router.use('/users', require('./users'));


module.exports = router;