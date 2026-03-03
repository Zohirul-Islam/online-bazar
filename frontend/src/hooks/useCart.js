import { useContext} from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const useCart = () => {
  const { cartItems, setCartItems,products } = useContext(ShopContext);

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please select product size");
      return;
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

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) return;
    cartData[itemId][size] = quantity;

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
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems){
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]){
          try {
            if (cartItems[items][item] > 0) {
              totalAmount += itemInfo.price * cartItems[items][item]
            }
          } catch (error) {
            
          }
      }
    }
    return totalAmount
  }

  return {
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    
  };
};

export default useCart;
