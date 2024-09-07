import React from 'react'
import data_product from "../Assets/data"
import Item from "../Item/Item"

const RelatedProducts = () => {
  return (
    <div className='flex flex-col items-center gap-3 h-[90vh]'>
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Related Products</h1>
<hr className="w-[170px] h-[6px] rounded-full bg-gradient-to-r from-cyan-500 to-lime-500 shadow-lg pb-1 mb-10" />

      <div className="mt-5 flex gap-16">
        {data_product.map((item, i) => {
            return <Item 
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
