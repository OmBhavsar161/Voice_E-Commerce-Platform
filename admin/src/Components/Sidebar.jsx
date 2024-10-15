import React from "react";
import { Link, useLocation } from "react-router-dom";
import add_product_icon from '../assets/Product_Cart.svg';
import list_product_icon from '../assets/Product_list_icon.svg';
import support_icon from '../assets/support_icon.svg'
import registration_icon from '../assets/registration_icon.svg'
import product_quantity_icon from '../assets/product_quantity.png'

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col pt-[30px] gap-[20px] w-[250px] w-max-[250px] h-[100vh] bg-gray-100 font-sriracha">
      <Link to="/addproduct" style={{ textDecoration: "none" }}>
        <div
          className={`flex items-center justify-center my-2 mx-[20px] py-[10px] px-[10px] ring-2 gap-[20px] hover:bg-white hover:ring-2 hover:ring-blue-800 ${
            location.pathname === "/addproduct" ? "bg-white ring-2 ring-blue-800" : ""
          }`}
        >
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to="/listproduct" style={{ textDecoration: "none" }}>
        <div
          className={`flex items-center justify-center my-2 mx-[20px] py-[10px] px-[10px] ring-2 gap-[20px] hover:bg-white hover:ring-2 hover:ring-blue-800 ${
            location.pathname === "/listproduct" ? "bg-white ring-2 ring-blue-800" : ""
          }`}
        >
          <img src={list_product_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>
      <Link to="/supportdata" style={{ textDecoration: "none" }}>
        <div
          className={`flex items-center justify-center my-2 mx-[20px] py-[5px] px-[10px] ring-2 gap-[20px] hover:bg-white hover:ring-2 hover:ring-blue-800 ${
            location.pathname === "/supportdata" ? "bg-white ring-2 ring-blue-800" : ""
          }`}
        >
          <img src={support_icon} alt="" className="w-[40px]"/>
          <p>Support Data</p>
        </div>
      </Link>
      <Link to="/registrationdata" style={{ textDecoration: "none" }}>
        <div
          className={`flex items-center justify-center my-2 mx-[20px] py-[5px] px-[10px] ring-2 gap-[20px] hover:bg-white hover:ring-2 hover:ring-blue-800 ${
            location.pathname === "/registrationdata" ? "bg-white ring-2 ring-blue-800" : ""
          }`}
        >
          <img src={registration_icon} alt="" className="w-[40px]"/>
          <p>Registered Users</p>
        </div>
      </Link>
      <Link to="/productquantity" style={{ textDecoration: "none" }}>
        <div
          className={`flex items-center justify-center my-2 mx-[20px] py-[5px] px-[10px] ring-2 gap-[20px] hover:bg-white hover:ring-2 hover:ring-blue-800 ${
            location.pathname === "/productquantity" ? "bg-white ring-2 ring-blue-800" : ""
          }`}
        >
          <img src={product_quantity_icon} alt="" className="w-[34px]"/>
          <p>Product Quantity</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
