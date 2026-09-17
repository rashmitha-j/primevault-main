import React from 'react'
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom'
import { HiOutlineUser , HiOutlineShoppingBag , HiBars3BottomRight} from "react-icons/hi2";
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Navbar = () => {
      const [drawerOpen, setDrawerOpen ] = useState(false);
      const [ navDrawerOpen, setNavDrawerOpen ] = useState(false);
      const {cart} = useSelector((state) => state.cart);

      const {user } = useSelector((state) => state.auth);




      const cartItemCount = cart?.products?.reduce((total, product) => total+ product.quantity, 0)  || 0;


      const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
      }
    
        const toggleCartDrawer = () => {
            setDrawerOpen(!drawerOpen);
        };

  return (
    <>
    <nav className='sticky top-0 z-50 bg-white shadow-sm container mx-auto flex items-center justify-between py-1 px-3'>

        {/* left -logo */}
        <div>
        <Link to='/'>
        <img src={logo} className='w-28 h-auto object-contain' alt="Logo" />
                </Link>
        </div>
        {/* center navigation links */}
        <div className='hidden md:flex space-x-6'>
        <Link to="/collection/all?gender=Men"  className='text-gray-700 hover:text-black text-sm font-medium uppercase' >
            Men
        </Link>

        <Link to="/collection/all?gender=Women" className='text-gray-700 hover:text-black text-sm font-medium uppercase' >
            Women
        </Link>

        <Link to="/collection/all?category=Top Wear" className='text-gray-700 hover:text-black text-sm font-medium uppercase' >
            Top Wear
        </Link>

        <Link to="/collection/all?category=Bottom Wear" className='text-gray-700 hover:text-black text-sm font-medium uppercase' >
            Bottom wear
        </Link>

        {user && user.role == "admin" && (
                        
                        <Link to="/admin" className='block text-gray-600 hover:text-black' >Admin</Link>
                        )}
    

        </div>

        { /* right -icons */}
        <div className='flex items-center space-x-4'>
           
            <Link  to="/profile" className='hover:text-black '>
            <HiOutlineUser className='h-7 w-7 text-gray-700' />
            </Link>
            <button onClick={toggleCartDrawer} className='relative hover-text-black' > 
                <HiOutlineShoppingBag  className='h-7 w-7 text-gray-700'/>
                {cartItemCount > 0 && (
                    <span  className='absolute -top-1  bg-gray-900 text-white text-xs rounded-full px-2 py-0.5'>
                    {cartItemCount}
                </span>
                )}
                
            </button>
            {/* Search  */}
           
           <div className='overflow-hidden'>
             <SearchBar />
           </div>

            <button onClick={toggleNavDrawer} className='md:hidden'>
                <HiBars3BottomRight className='h-7 w-7 text-gray-700' />
            </button>

        </div>

    </nav>
    <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}/>

    {/* Mobile navigation */}
    {/* Mobile navigation */}
<div className={`
  fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full 
  bg-gradient-to-br from-white to-gray-50 shadow-2xl 
  transform transition-transform duration-300 z-50 
  rounded-tr-2xl rounded-br-2xl 
  font-sans
  ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}
`}>
  <div className='flex justify-end p-4'>
    <button onClick={toggleNavDrawer}>
      <IoMdClose className='h-6 w-6 text-gray-600 hover:text-black transform hover:rotate-90 transition duration-300' />
    </button>
  </div>

  <div className='p-6'>
    <h2 className='text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200'>
      Menu
    </h2>

    <nav className='space-y-3'>
      <Link 
        to="/collection/all?gender=Men" 
        onClick={toggleNavDrawer}
        className='block text-gray-600 hover:text-black hover:bg-gray-100 px-3 py-2 rounded-md transition-all duration-200'
      >
        Men
      </Link>

      <Link 
        to="/collection/all?gender=Women" 
        onClick={toggleNavDrawer}
        className='block text-gray-600 hover:text-black hover:bg-gray-100 px-3 py-2 rounded-md transition-all duration-200'
      >
        Women
      </Link>

      <Link 
        to="/collection/all?category=Top Wear" 
        onClick={toggleNavDrawer}
        className='block text-gray-600 hover:text-black hover:bg-gray-100 px-3 py-2 rounded-md transition-all duration-200'
      >
        Top Wear
      </Link>

      <Link 
        to="/collection/all?category=Bottom Wear" 
        onClick={toggleNavDrawer}
        className='block text-gray-600 hover:text-black hover:bg-gray-100 px-3 py-2 rounded-md transition-all duration-200'
      >
        Bottom Wear
      </Link>

      {user && user.role === "admin" && (
        <Link 
          to="/admin" 
          onClick={toggleNavDrawer}
          className='block text-amber-600 font-medium hover:text-amber-800 hover:bg-yellow-100 px-3 py-2 rounded-md transition-all duration-200'
        >
          Admin
        </Link>
      )}
    </nav>
  </div>
</div>

    
    </> 
  )
}

export default Navbar
