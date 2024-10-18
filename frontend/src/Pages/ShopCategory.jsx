import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import Loader from "../Pages/Loader"; // Import your loader component

const ShopCategory = (props) => {
  const { all_product, setAllProducts } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const baseURL = import.meta.env.VITE_API_URL;

  // Fetch local products from context
  useEffect(() => {
    if (all_product) {
      setProducts(all_product);
    }
  }, [all_product]);

  // Fetch newly added products from MongoDB
  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await fetch(`${baseURL}/allproducts`);
        const data = await response.json();
        setNewProducts(data);
        if (setAllProducts) setAllProducts(data); // Update context if needed
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching new products:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchNewProducts();
  }, [setAllProducts, baseURL]);

   // Combine existing and new products
  // const combinedProducts = [...products, ...newProducts];
  const combinedProducts = [...newProducts];

  // Render loader while fetching data
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="">
      <div className="flex my-4 mx-[170px] justify-between items-center">
        <p>
          <span className="font-semibold">Showing 1-{combinedProducts.length}</span> out of {combinedProducts.length} products
        </p>
        <div className="flex items-center py-3 px-4 rounded-full ring-2 ring-gray-600 hover:bg-gray-200">
          <span>Sort by</span>
          <img src={dropdown_icon} alt="dropdown" className="ml-2" />
        </div>
      </div>

      <div className="my-10 mx-20 grid grid-cols-4 gap-y-20">
        {combinedProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No products available</p>
        ) : (
          combinedProducts.map((item) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            }
            return null;
          })
        )}
      </div>
      <div className="flex justify-center items-center my-[150px] mx-auto w-[233px] h-[69px] rounded-full bg-slate-200 text-zinc-800 font-medium hover:text-black hover:bg-slate-300">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
