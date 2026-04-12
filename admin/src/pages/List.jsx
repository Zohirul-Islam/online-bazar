import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const totalProducts = list.length;
  console.log(totalProducts);
  const totalValue = list.reduce((acc, item) => acc + item.price, 0);
  console.log(totalValue);
  const categories = [...new Set(list.map((item) => item.category))];
  console.log(categories);
  const chartData = categories.map((cat) => ({
    name: cat,
    value: list.filter((item) => item.category === cat).length,
  }));
  console.log(chartData);

  const fetchProduct = async (page = 1) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/list-product?page=${page}`,
      );
      if (response.data.success) {
        console.log(response.data);
        setList(response.data.products);
        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchProduct();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded">
          <h2>Total Products</h2>
          <p className="text-xl font-bold">{totalProducts}</p>
        </div>

        <div className="p-4 bg-green-100 rounded">
          <h2>Total Value</h2>
          <p className="text-xl font-bold">
            {currency}
            {totalValue}
          </p>
        </div>

        <div className="p-4 bg-purple-100 rounded">
          <h2>Categories</h2>
          <p className="text-xl font-bold">{categories.length}</p>
        </div>
      </div>
      {/* chart start */}
      <div className="w-full h-64 mb-6 bg-white p-4 rounded shadow">
        <h2 className="mb-2 font-semibold">Products by Category</h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* chart end */}
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
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={item._id}
          >
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
        {/* 🔥 PAGINATION BUTTONS GO HERE */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            disabled={page === 1}
            onClick={() => fetchProduct(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => fetchProduct(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default List;
