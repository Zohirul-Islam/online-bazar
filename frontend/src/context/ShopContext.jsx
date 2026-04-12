import { createContext, useEffect, useState } from "react";

import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productApi";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  // 🚀 React Query (replaces useEffect + useState for products)
  const {data:products,isLoading,isError,error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5
  })
  console.log(products);
  const value = {
    products: products || [],
    isLoading,
    isError,
    error,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    navigate,
    backendUrl
    
  };
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
