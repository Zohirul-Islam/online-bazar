import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { BsCollectionFill } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { MdContactPhone } from "react-icons/md";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <img
        onClick={() => setVisible(!visible)}
        src={assets.menu_icon}
        className="w-5 cursor-pointer sm:hidden"
        alt=""
      />
      <img src={assets.logo} className="w-36" alt="" />
      {/* desktop menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/">
          <div className="flex flex-col items-center gap-1">
            <p className="">HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </div>
        </NavLink>
        <NavLink to="/about">
          <div className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </div>
        </NavLink>
        <NavLink to="/collection">
          <div className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>

            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </div>
        </NavLink>
        <NavLink to="/contact">
          <div className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </div>
        </NavLink>
      </ul>
      {/* icons */}
      <div className="flex items-center gap-6">
        <img src={assets.search_icon} className="w-6 cursor-pointer" alt="" />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile-icon"
          />
          <div className="hidden group-hover:block absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">My Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative hidden sm:block">
          <img className="w-5 cursor-pointer" src={assets.cart_icon} alt="" />
          <p className="absolute -bottom-1.25 -right-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            2
          </p>
        </Link>
      </div>
      {/* mobile menu */}
      <div
        className={`absolute top-17.5 border left-0 right-0 bottom-0  overflow-hidden bg-gray-700   transition duration-300 ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-white pt-5 pl-5">
          <p className="flex gap-2 py-2 pl-6">
            <IoHome />
            <NavLink onClick={() => setVisible(false)} to="/">
              HOME
            </NavLink>
          </p>
          <p className="flex gap-2 py-2 pl-6">
            <BsCollectionFill />
            <NavLink
              onClick={() => setVisible(false)}
              
              to="/collection"
            >
              COLLECTION
            </NavLink>
          </p>
          <p className="flex gap-2 py-2 pl-6">
            <TbListDetails />
            <NavLink
              onClick={() => setVisible(false)}
              
              to="/about"
            >
              ABOUT
            </NavLink>
          </p>

          <p className="flex gap-2 py-2 pl-6">
            <MdContactPhone />
            <NavLink
            onClick={() => setVisible(false)}
            
            to="/contact"
          >
            CONTACT
          </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
