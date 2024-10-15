import React, { useState, useEffect } from "react";
import Item from "../Item/Item";

const RelatedProducts = ({ currentCategory }) => {
  const [relatedCollection, setRelatedCollection] = useState([]);
  const baseURL =  import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRelatedCollections = async () => {
      try {
        const response = await fetch(`${baseURL}/allproducts`); // Adjust the backend URL if deployed
        const data = await response.json();
        
        // Filter products based on the current category
        const filteredProducts = data.filter(
          (item) => item.category === currentCategory
        );
        
        // Randomly pick 4 products from the filtered list
        // const shuffledProducts = data.sort(() => 0.5 - Math.random());
        const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffledProducts.slice(0, 4);

        setRelatedCollection(selectedProducts); // Set the 4 random products to state
      } catch (error) {
        console.error("Error fetching related collections:", error);
      }
    };

    fetchRelatedCollections();
  }, [currentCategory]); // Re-fetch if the category changes

  return (
    <div className="flex flex-col items-center gap-3 h-[90vh]">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Related Products
      </h1>
      <hr className="w-[170px] h-[6px] rounded-full bg-gradient-to-r from-cyan-500 to-lime-500 shadow-lg pb-1 mb-10" />

      <div className="mt-5 flex gap-16">
        {relatedCollection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
