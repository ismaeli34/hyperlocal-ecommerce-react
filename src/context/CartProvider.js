import React, { Component, useContext, useEffect, useState } from 'react'
import CartContext from './CartContext';
import UserContext from './user.context';
import { addItemToCart, getCart, removeItemFromCart } from '../services/CartService';
import { toast } from "react-toastify";

const CartProvider = ({children})=>{


    const {isLogin,userData}=useContext(UserContext);
    const [cart, setCart] = useState(null);
    const [heading,setHeading]= useState("Initial Heading");

    // load user cart initially

    const loadUserCart = async (userId)=>{
        try{
            const cart= await getCart(userId)
            setCart({...cart})
            console.log(cart)
        }catch(error){
            console.log(error)
            setCart({items:[]})
        }
    }


//remove item from cart
const  removeItem= async (itemId)=>{
    try{
     const result= await removeItemFromCart(userData.user.userId,itemId);
     const newCartItems = cart.items.filter((item)=> item.cartItemId !== itemId);
     setCart({
        ...cart,
        items:newCartItems
     })
    } catch(error){
        console.log(error);
        toast.error("Error in removing items from cart")
    }
}
    useEffect(()=>{
    if(isLogin){
        // get user cart
        loadUserCart(userData.user.userId)
    }else{
        setCart(null)
    }
    },[isLogin])

    // add item to cart

    const addItem = async (quantity,productId,next)=>{
        try{
         const result=  await addItemToCart(userData.user.userId,
            productId,
            quantity);
            setCart({...result});
            next();

        }catch(error){
            console.log(error);
            toast.error("error in adding product in cart")
        }
    }
    return( <CartContext.Provider
    value={{cart,setCart,addItem,removeItem}}> {children}</CartContext.Provider>
    );

};


export default CartProvider;