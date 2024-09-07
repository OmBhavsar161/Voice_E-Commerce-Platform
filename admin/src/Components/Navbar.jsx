import React from 'react'
import navLogo from '../assets/admin_panel_logo.svg'
import navProfile from '../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-[15px] px-[60px] shadow-lg shadow-gray-200 mb-1'>
      <img src={navLogo} alt="" className="nav-logo w-[190px]" />
      <img src={navProfile} className="w-[75px]" alt="" />
    </div>
  )
}

export default Navbar
