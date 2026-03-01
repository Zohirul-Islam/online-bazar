import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  /* state */
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  /* controller */
  const fetchProduct = async () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  /* side effect */
  useEffect(() => {
    fetchProduct();
  }, [productId, products]);
  if (!productData) {
    return <div>Loading</div>;
  }
  return (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
        {/* left side for product image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* left side image 1 */}
          <div className="flex sm:flex-col overflow-x-auto gap-1 sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                alt="product image"
                className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer"
              />
            ))}
          </div>
          {/* left side image2 */}
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* right side for product details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_dull_icon} alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border cursor-pointer py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border border-gray-400 px-5 py-3 text-sm">
            Description
          </b>
          <p className="border px-5 border-gray-400 py-3 text-sm">
            Reviews (122)
          </p>
        </div>
        <div className="flex flex-col gap-2 px-6 py-6 text-sm text-gray-500 border">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores at
            accusantium possimus consequuntur ipsam facilis similique enim rerum
            autem porro. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Maiores at accusantium possimus consequuntur ipsam facilis
            similique enim rerum autem porro.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores at
            accusantium possimus consequuntur ipsam facilis similique enim rerum
            autem porro. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Maiores at accusantium possimus consequuntur ipsam facilis
            similique enim rerum autem porro.
          </p>
        </div>
      </div>
      {/* display related product */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  );
};

export default Product;
