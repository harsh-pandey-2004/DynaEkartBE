const express=require('express');
const router=express.Router();
const {addtoWishlist, removeFromWishlist, ListWishlist}=require('../Controllers/wishlistController');
const {userAuthentication}=require('../MiddleWare/userAuthentication');

router.post('/add',userAuthentication,addtoWishlist);
router.post('/remove',userAuthentication,removeFromWishlist);
router.get("/list", userAuthentication, ListWishlist)

module.exports=router;