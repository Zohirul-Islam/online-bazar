import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

    const [inputValue, setInputValue] = useState(search);
    const [visible, setVisible] = useState(false);
    const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setSearch]);
    
    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    },[location])

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='border inline-flex items-center justify-center border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='flex-1 outline-0 text-sm'
          type="text"
          placeholder='Search...'
        />
        <img src={assets.search_icon} className='w-4' alt="" />
      </div>

      <img
        onClick={() => setShowSearch(false)}
        className='inline cursor-pointer w-3'
        src={assets.cross_icon}
        alt=""
      />
    </div>
  ) : null
}

export default SearchBar