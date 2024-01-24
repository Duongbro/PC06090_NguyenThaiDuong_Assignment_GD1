var express = require('express');
var router = express.Router();

const adminController = require('../app/controllers/Admin_Controller');

router.use('/orders', adminController.orders);

router.use('/products', adminController.products);

router.use('/categories', adminController.categories);

router.use('/', adminController.index);

module.exports = router;