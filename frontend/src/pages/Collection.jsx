import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useCallback } from "react";
const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const applyFilter = () => {
    let productCopy = products.slice();
    if (category.length > 0) {
        productCopy = productCopy.filter(item=>category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item=>subCategory.includes(item.subCategory))
    }
    setFilterProducts(productCopy);
  }
  const sortProduct = () => {
   const fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)))
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)))
        break;
      default:
        applyFilter()
        break;
    }
  }
  const toggleCategory = useCallback((e) => {
  const value = e.target.value;
    setCategory(prev=>prev.includes(value)? prev.filter(item=>item !== value):[...prev,value])
  }, []);
  const toggleSubCategory = useCallback((e) => {
  const value = e.target.value;

  setSubCategory(prev =>
    prev.includes(value)
      ? prev.filter(item => item !== value)
      : [...prev, value]
  );
}, []);
  useEffect(() => {
    applyFilter();
  }, [subCategory, category]);
  useEffect(() => {
    sortProduct()
  },[sortType])
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-2 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input onChange={toggleCategory} value={"Men"} className="w-3" type="checkbox" />
              Men
            </p>
            <p className="flex gap-2">
              <input onChange={toggleCategory} value={"Women"} className="w-3" type="checkbox" />
              Women
            </p>
            <p className="flex gap-2">
              <input onChange={toggleCategory} value={"Kids"} className="w-3" type="checkbox" />
              Kids
            </p>
          </div>
        </div>
        {/* sub categories */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-2 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input onChange={toggleSubCategory} value={"Topwear"} className="w-3" type="checkbox" />
              Top wear
            </p>
            <p className="flex gap-2">
              <input onChange={toggleSubCategory} value={"Bottomwear"} className="w-3" type="checkbox" />
              Bottom wear
            </p>
            <p className="flex gap-2">
              <input onChange={toggleSubCategory} value={"Winterwear"} className="w-3" type="checkbox" />
              Winter wear
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="text-lg sm:text-2xl">
            <Title txt1={"ALL"} txt2={"COLLECTION"} />
          </div>

          {/* PRODUCT SORT */}
          <select onChange={(e)=>setSortType(e.target.value)} className="text-sm  border border-gray-300 rounded-md px-3 py-2 focus:outline-none w-full sm:w-40">
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
        {/* map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                        {
                filterProducts.map((item,index)=>(
                  <ProductItem key={item._id} name={item.name} price={item.price} image={item.image} id={item._id} />
                ))
            }
        </div>
      </div>
    </div>
  );
};

export default Collection;
