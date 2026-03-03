import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const currency = "$";
  const delivery_fee = 10;
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    navigate
    
  };
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
