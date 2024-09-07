import React from 'react'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { Link } from 'react-router-dom';

const Breadcrum = (props) => {
    const {product} = props;
    
  return (
    <div className='flex gap-3 ml-8 mb-8 font-semibold mt-6'>
      <Link to="/">Home</Link> <img src={arrow_icon} alt="" className='h-5 mt-[3px]'/> <Link to="/allproductsdisplay">Products</Link> <img src={arrow_icon} alt="" className='h-5 mt-[3px]'/> <Link to={`/${product.category}`} className='capitalize'>{product.category}</Link> <img src={arrow_icon} alt="" className='h-5 mt-[3px]'/> <Link>{product.name}</Link>
    </div>
  )
}

export default Breadcrum
