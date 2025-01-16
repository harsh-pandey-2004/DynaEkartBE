const product = require('../Models/productModel');
const user = require('../Models/userModel');

// const AddToCart = async (req, res) => {
//     try {
//         const { productId } = req.body;
//         const productData = await product.findById(productId);
//         const userData = await user.findById(req.user.id);
//         const cartData = userData.cart;
//         let flag = 0;
//         cartData.forEach((element) => {
//             if (element.productId == productId) {
//                 element.quantity += quantity;
//                 flag = 1;
//             }
//         });
//         if (flag == 0) {
//             cartData.push({ productId, quantity });
//         }
//         let price = productData.price;
//         let total = 0;
//         cartData.forEach((element) => {
//             total += element.quantity * price;
//         });
//         await user.findByIdAndUpdate(req.userId, { cart: cartData });
//         res.status(200).json({ message: 'Product Added to Cart Successfully', cartData });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

const addtoCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const productData = await product.findById(productId);
        if (!productData) {
          return res.status(400).json({ message: "Product ID is required" });
        }
        const id = req.user.id;
        const userData = await user.findById(id);
        if (!userData) {
          return res.status(404).json({ message: "User not found" });
        }
        const cartdata = userData.cart;
    
        let findKey = cartdata.find(
          (item) => item?.productId.toString() === productId
        );
    
        if (findKey) {
          findKey.quantity += 1;
        } else {
          cartdata.push({
            productId,
            quantity: 1,
          });
        }
        await user.findByIdAndUpdate(
          id,
          { cart: cartdata },
          { new: true }
        );
        return res.status(201).json({ message: "Product Added to Cart" });
      } catch (error) {
        return res.status(404).json({
          message: "Product not Found" + error,
        });
      }    
};

const removequantityfromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId)
          return res.status(400).json({ message: "Product ID is required" });
        const id = req.user.id;
        const userData = await user.findById(id);
        if (!userData) {
          return res.status(404).json({ message: "User not found" });
        }
        const cartdata = userData.cart;
    
        let findKey = cartdata.find(
          (item) => item?.productId.toString() === productId
        );
    
        if (findKey) {
          findKey.quantity -= 1;
          if (findKey.quantity === 0) {
            const index = cartdata.indexOf(findKey);
            cartdata.splice(index, 1);
          }
        } else {
          return res.status(404).json({ message: "Product not found" });
        }
        await user.findByIdAndUpdate(
          id,
          { cart: cartdata },
          { new: true }
        );
        return res.status(201).json({ message: "Product Removed from Cart" });
      } catch (error) {
        return res.status(404).json({
          message: "Product not Found" + error,
        });
      }    
}

const removefromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId)
          return res.status(400).json({ message: "Product ID is required" });
        const id = req.user.id;
        const userData = await user.findById(id);
        if (!userData) {
          return res.status(404).json({ message: "User not found" });
        }
        const cartdata = userData.cart;
    
        let findKey = cartdata.find(
          (item) => item?.productId.toString() === productId
        );
    
        if (findKey) {
          const index = cartdata.indexOf(findKey);
          cartdata.splice(index, 1);
        } else {
          return res.status(404).json({ message: "Product not found" });
        }

        console.log(cartdata);
        await user.findByIdAndUpdate(
          id,
          { cart: cartdata },
          { new: true }
        );
        return res.status(201).json({ message: "Product Removed from Cart" });
      } catch (error) {
        return res.status(404).json({
          message: "Product not Found" + error,
        });
      }    
}

const listCartItems = async (req, res) => {
    try {
        const id = req.user.id;
        const userData = await user
        .findById(id)
        .select("cart")
        .populate({
          path: "cart.productId",
          select: "-quantity",
        })
        if (!userData) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ userData });
      } catch (error) {
        return res.status(404).json({
          message: "Product not Found" + error,
        });
      }    
}

module.exports =  {addtoCart, removefromCart, removequantityfromCart, listCartItems} ;