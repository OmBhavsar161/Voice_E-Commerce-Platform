import React from "react";
import { Link } from "react-router-dom";

// Function to format numbers with commas
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Item = (props) => {
  return (
    <div className="w-[300px] hover:scale-105 transition duration-[600ms]">
      <Link to={`/products/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" className="w-[300px]" /></Link>
      <p className="my-[6px] mx-0 text-[22px] font-bold mt-8">{props.name}</p>
      <div className="flex gap-[8px] mt-4 items-center">
        <div className="text-gray-800 text-[22px] font-semibold">
          ₹{formatPrice(props.new_price)}
        </div>
        <div className="text-neutral-500 text-[18px] font-medium line-through">
          ₹{formatPrice(props.old_price)}
        </div>
      </div>
    </div>
  );
};

export default Item;
