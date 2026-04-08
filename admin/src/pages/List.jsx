import axios from "axios";
import { useEffect, useState } from "react"
import { backendUrl } from "../App";
import { toast } from "react-toastify";



const List = () => {
  const [list, setList] = useState([]);
  const fetchProduct = async() => {
      try {
        const response = await axios.get(backendUrl + '/api/product/list-product');
        if (response.data.success) {
          setList(response.data.products);
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }
  useEffect(() => {
    fetchProduct();
  },[])
  return (
    <>
      <h1 className="mb-2">All Products List</h1>
      <div className="flex flex-col gap-2">
        {/* List table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Actions</b>
        </div>
        {/* product list here */}
        
      </div>
    </>
  )
}

export default List