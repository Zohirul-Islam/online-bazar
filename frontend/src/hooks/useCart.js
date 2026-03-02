import { useState } from "react";
import { toast } from "react-toastify";


const useCart = () => {
    const [cartItems, setCartItems] = useState({});
      
    const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select product size");
      return
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const qty = cartItems[itemId][size];
        if (qty > 0) {
          totalCount += qty;
        }
      }
    }
    return totalCount;
    };
    return {
    cartItems,
    addToCart,
    getCartCount
  };

}

export default useCart