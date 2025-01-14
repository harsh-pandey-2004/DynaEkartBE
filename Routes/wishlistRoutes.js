const express=require('express');
const router=express.Router();
const {addtoWishlist, removeFromWishlist}=require('../Controllers/wishlistController');
const {userAuthentication}=require('../MiddleWare/userAuthentication');

router.post('/add',userAuthentication,addtoWishlist);
router.post('/remove',userAuthentication,removeFromWishlist);

module.exports=router;