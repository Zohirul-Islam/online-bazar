import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchProducts = async () => {
    const res = await axios.get(`${backendUrl}/api/product/list-product`);
  return res.data.products; // or res.data.data depending on backend
};