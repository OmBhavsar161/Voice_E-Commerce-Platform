import React from 'react'
import exclusive_image from "../Assets/exclusive_image.png"
import { Link } from 'react-router-dom'

const Offers = () => {
  return (
    <div className='flex w-[90%] h-[80vh] m-auto py-0 px-[140px] mb-[150px] bg-gradient-to-r from-purple-300 via-cyan-300 to-pink-300 rounded-lg'>
      <div className="flex flex-1 flex-col justify-center ">
        <h1 className='text-7xl text-gray-900 font-semibold pb-8'>Exclusive</h1>
        <h1 className='text-7xl text-gray-900 font-semibold'>Offers For You</h1>
        <p className='text-gray-900 font-semibold text-[22px] mt-4'>ONLY ON BEST SELLERS PRODUCT</p>
        <Link to={"/products/73"}><button className='w-[282px] h-[70px] bg-red-600 rounded-[35px] border-none text-white text-[22px] font-medium mt-[30px] hover:text-red-600 hover:bg-white hover:ring-red-600 hover:ring-4 ' >Check Now</button></Link>
      </div>
      <div className='flex flex-1 items-center justify-end '>
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}

export default Offers
