import { createContext, useState, useEffect } from "react";
import allProductData from "../Components/Assets/all_product.js";

export const ShopContext = createContext(null);

const getDefaultCart = (allProductData) => {
  let cart = {};
  for (let index = 0; index < allProductData.length; index++) {
    cart[allProductData[index].id] = 0; // Use product ID instead of index
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState(allProductData);
  const [cartItems, setCartItems] = useState(() =>
    getDefaultCart(allProductData)
  );

  useEffect(() => {
    console.log("Cart Items Updated:", cartItems);
  }, [cartItems]);

  const addToCart = (itemId, quantity) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + quantity };
      return newCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Total cart amount converted in USD
  const getTotalCartAmountInUSD = () => {
    let totalAmount = 0;
    const exchangeRateToUSD = 0.01192; // INR to USD exchange rate (1 USD = 83.91 INR)
  
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
  
    // Convert to USD and round to 2 decimal places
  const totalAmountInUSD = (totalAmount * exchangeRateToUSD).toFixed(2);
  
    return totalAmountInUSD;
  };
  

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem; // Add this return statement
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    getTotalCartAmountInUSD,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
