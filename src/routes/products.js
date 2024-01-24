var express = require('express');
var router = express.Router();

const productsController = require('../app/controllers/ProductsController');


router.use('/:product_detail', productsController.product_detail);


router.use('/', productsController.index);

module.exports = router;