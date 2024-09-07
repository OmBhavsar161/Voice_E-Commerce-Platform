import React from 'react'
// import footer_logo from "../Assets/logo_big.png"
import footer_logo from "../Assets/logo_footer2.svg"
import instgram_icon from "../Assets/instagram_icon.png"
import pintester_icon from "../Assets/pintester_icon.png"
import whatsapp_icon from "../Assets/whatsapp_icon.png"

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-[50px] mt-10'>
      <div className="flex items-center ">
        <img src={footer_logo} alt="" className='w-[180px]'/>
        <p className='font-sriracha text-gray-800 font-bold text-5xl'>Voice</p>

      </div>
      <ul className="flex list-none gap-[50px] text-gray-800 font-[20px]">
        <li className='cursor-pointer'>Company</li>
        <li className='cursor-pointer'>Products</li>
        <li className='cursor-pointer'>Offices</li>
        <li className='cursor-pointer'>About</li>
        <li className='cursor-pointer'>Contact</li>
      </ul>
      <div className='flex gap[20px] '>
        <div className="p-3 mx-2 hover:ring-2 hover:ring-slate-300 hover:shadow-md rounded-full hover:bg-slate-200">
          <img src={instgram_icon} alt="" />
        </div>
        <div className="p-3 mx-2 hover:ring-2 hover:ring-slate-300 hover:shadow-md rounded-full hover:bg-slate-200">
          <img src={pintester_icon} alt="" />
        </div>
        <div className="p-3 mx-2 hover:ring-2 hover:ring-slate-300 hover:shadow-md rounded-full hover:bg-slate-200">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-[30px] w-[100%] mb-[30px] text-gray-500 font-[20px] ">
        <hr className='w-[80%] border-none rounded-xl h-[3px] bg-neutral-300'/>
        <p>Copyright @ 2024 - All Right Reserves</p>
      </div>
    </div>
  )
}

export default Footer
