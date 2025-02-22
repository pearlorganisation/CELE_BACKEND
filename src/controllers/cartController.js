import crypto from "crypto"; 
import {ProductModel} from "../models/productModal.js";
import Cart from "../models/cart.js";

export const addToCart = async (req, res) => {
    try {
        let { cartId, productId, quantity } = req.body;


        if (!cartId) {
            cartId = crypto.randomUUID();
        }

        const product = await ProductModel.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

   
        let cart = await Cart.findOne({ cartId });

        if (!cart) {
        
            cart = new Cart({ cartId, items: [{ productId, quantity }] });
        } else {
         
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity; 
            } else {
                cart.items.push({ productId, quantity }); 
            }
        }

        await cart.save();
        res.status(200).json({ message: "Item added to cart", cartId, cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};




//get all data froim cart 


export const cartDetails = async (req, res) => {
 
    try {
        const carts = await Cart.find().populate("items.productId"); 
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


//get by id 


export  const getCartDataById=async(req,res)=>{
    try{
        const {id}=req.params;
        const cartItem=await Cart.findById(id)
        if(!cartItem){
            return res.status(404).json({message:"cart item not find"})
                    }
    res.status(200).json(cartItem)

    }
    catch(error){
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

//incement byid 


export const Incrementquantity= async(req,res)=>{
    try{
        const {id}=req.params;
        const cartItem = await Cart.findById(id)

        if(!cartItem){
         return res.status(404).json({
            message:"cart item not found"
         }) 
        }

        cartItem=cartItem.quantity+=1;
        await cartItem.save()
    }
catch(error){
 res.status(500).json({
    message:"server error",error:error.message
 })   
}}


export const decrementCartItem= async(req,res)=>{
    try{
        const{id}=req.params;
        const cartItem=await Cart.findById(id)
        if(!cartItem){
            return res.status(404).json({
                message:"cart item not found"})
        }
if(cartItem.quantity>1){
    cartItem.quantity-=1
await cartItem.save()
return res.status(200).json(cartItem)
}
    else{
        await Cart.findByIdAndDelete(id);
        return res.status(200).json({message:"item removed from cart"})
    }
}
catch(error){
    res.status(500).json({message:"server error",error:error.message})
}
}








