import React, { useContext, useEffect, useState } from "react";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { useParams } from "react-router-dom";
import Loader from "../../Pages/Loader";

const ProductDisplay = () => {
  const { productId } = useParams();
  const { all_product, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch the product either locally or from the backend
  useEffect(() => {
    const localProduct = all_product.find((e) => e.id === Number(productId));
    const baseURL =  import.meta.env.VITE_API_URL;

    if (localProduct) {
      setProduct(localProduct);
    } else {
      const fetchProductFromMongo = async () => {
        try {
          const response = await fetch(
            `${baseURL}/product/${productId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const productData = await response.json();
          setProduct(productData);
        } catch (error) {
          console.error("Error fetching product from MongoDB:", error);
        }
      };

      fetchProductFromMongo();
    }
  }, [productId, all_product]);

  // Format price to include commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Increase or decrease product quantity
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Add to cart and update product quantity locally
  const handleAddToCart = async () => {
    if (product.quantity > 0) {
      await addToCart(product.id, quantity);

      // Decrease the product's available quantity locally in the state
      setProduct((prev) => ({
        ...prev,
        quantity: prev.quantity - quantity,
      }));
      setQuantity(1); // Reset the selected quantity after adding to cart
    }
  };

  // Return loading state while fetching product
  if (!product) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 shadow-lg rounded-lg">
      {/* Left Section: Image Gallery */}
      <div className="flex flex-col lg:flex-row items-center gap-16 w-full lg:w-2/3">
        {/* Thumbnail Images */}
        <div className="flex flex-col gap-4">
          <img
            src={product.image}
            alt="Product Thumbnail"
            className="w-full h-20 object-cover border border-gray-300 rounded-md hover:ring-2 hover:ring-gray-900 hover:scale-105 hover:shadow-xl"
          />
          <img
            src={product.image}
            alt="Product Thumbnail"
            className="w-full h-20 object-cover border border-gray-300 rounded-md hover:ring-2 hover:ring-gray-900 hover:scale-105 hover:shadow-xl"
          />
          <img
            src={product.image}
            alt="Product Thumbnail"
            className="w-full h-20 object-cover border border-gray-300 rounded-md hover:ring-2 hover:ring-gray-900 hover:scale-105 hover:shadow-xl"
          />
          <img
            src={product.image}
            alt="Product Thumbnail"
            className="w-full h-20 object-cover border border-gray-300 rounded-md hover:ring-2 hover:ring-gray-900 hover:scale-105 hover:shadow-xl"
          />
        </div>
        {/* Main Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt="Product Main"
            className="w-[500px] object-cover border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Right Section: Product Details */}
      <div className="flex flex-col gap-4 w-full lg:w-2/3">
        {/* Product Name */}
        <h1 className="text-4xl font-semibold">{product.name}</h1>
        {/* Star Rating */}
        <div className="flex items-center gap-1 mt-2">
          <img src={star_icon} alt="Star" className="w-6 h-6" />
          <img src={star_icon} alt="Star" className="w-6 h-6" />
          <img src={star_icon} alt="Star" className="w-6 h-6" />
          <img src={star_icon} alt="Star" className="w-6 h-6" />
          <img src={star_dull_icon} alt="Dull Star" className="w-6 h-6" />
          <p className="text-sm text-gray-600">(122)</p>
        </div>
        {/* Price */}
        <div className="flex gap-2 items-center mt-4">
          <span className="text-xl line-through text-gray-500">
            ₹{formatPrice(product.old_price)}
          </span>
          <span className="text-3xl font-bold text-black">
            ₹{formatPrice(product.new_price)}
          </span>
        </div>

        {/* Off percentage in Prices */}
        <p className="text-xl text-white mt-4 py-2 bg-green-500 rounded-lg pl-4">
          Super Saver Deal
          <span className="font-bold text-2xl pl-4">
            {product.off_percentage}% OFF
          </span>
          <span className="pl-80">Hurry Up</span>
        </p>

        {/* Description */}
        <p className="text-gray-700 mt-2">
          {product.category === "tws"
            ? "Enjoy extended playtime with superior battery life, cutting-edge ANC, and Voice Quick Connect Technology for seamless pairing and rich sound on the go."
            : product.category === "headphones"
            ? "Dive into your favorite tracks with powerful drivers, advanced ANC, and Voice Quick Connect Technology, ensuring immersive audio and clear calls with ENC."
            : "Experience vibrant visuals on a crystal-clear AMOLED display, BT Calling, while staying connected with Voice Quick Connect Technology for seamless notifications and health tracking on your wrist."}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mt-6">
          <button
            className={`bg-gray-300 text-gray-600 w-8 h-8 flex items-center justify-center rounded-full pb-1 ${
              product.quantity === 0
                ? "cursor-not-allowed opacity-80"
                : "hover:bg-gray-400"
            }`}
            onClick={decrementQuantity}
            disabled={product.quantity === 0}
          >
            -
          </button>
          <span className="text-xl">{quantity}</span>
          <button
            className={`bg-gray-300 text-gray-600 w-8 h-8 flex items-center justify-center rounded-full pb-1 ${
              quantity >= product.quantity
                ? "cursor-not-allowed opacity-80"
                : "hover:bg-gray-400"
            }`}
            onClick={incrementQuantity}
            disabled={quantity >= product.quantity}
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <div className="relative">
          <button
            className={`p-2 rounded-lg mt-6 w-80 transition-colors duration-300 
      ${
        product.quantity === 0
          ? "bg-red-500 cursor-not-allowed opacity-90" 
          : "bg-black text-white hover:bg-gray-800"
      }`}
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
          >
            {product.quantity === 0 ? "Out of Stock" : "ADD TO CART"}
          </button>
        </div>

        {/* Category and Tags */}
        <p className="text-gray-700 mt-4 capitalize">
          <span className="font-semibold ">Category: </span>
          {product.category}
          <span className="ml-4 font-semibold">Tags:</span> Featured, Stylist
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
