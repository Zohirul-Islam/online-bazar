import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
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
              <input value={"Men"} className="w-3" type="checkbox" />
              Men
            </p>
            <p className="flex gap-2">
              <input value={"Women"} className="w-3" type="checkbox" />
              Women
            </p>
            <p className="flex gap-2">
              <input value={"Kids"} className="w-3" type="checkbox" />
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
              <input value={"Topwear"} className="w-3" type="checkbox" />
              Top wear
            </p>
            <p className="flex gap-2">
              <input value={"Bottomwear"} className="w-3" type="checkbox" />
              Bottom wear
            </p>
            <p className="flex gap-2">
              <input value={"Winterwear"} className="w-3" type="checkbox" />
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
          <select className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none w-full sm:w-auto">
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Collection;
