const express = require('express');
const router = express.Router();

const { addtoCart, removefromCart, removequantityfromCart, listCartItems } = require('../Controllers/cartController');
const { userAuthentication } = require('../MiddleWare/userAuthentication');

router.post('/add', userAuthentication, addtoCart);
router.post('/remove', userAuthentication, removequantityfromCart);
router.get('/list', userAuthentication, listCartItems);
router.post('/delete', userAuthentication, removefromCart);

module.exports = router;