import React, { useEffect, useState } from "react";

const ProductQuantity = () => {
  const [products, setProducts] = useState([]);
  const baseURL =  import.meta.env.VITE_API_URL;

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseURL}/allproducts`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Update product quantity in the backend
  const updateQuantity = async (id, quantity) => {
    if (quantity < 0) return; // Prevent negative quantity
    try {
      await fetch(`${baseURL}/allproducts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
      // Update state locally after successful update
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, quantity } : product
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Product Quantities</h1>
      <p className="text-lg font-semibold mb-4">
        Total items available: {products.length}
      </p>
      <div className="grid grid-cols-4 gap-4 py-2 bg-gray-100 text-gray-700 font-semibold">
        <p>Product ID</p> {/* Added Product ID header */}
        <p className="-ml-[150px]">Product Image</p>
        <p className="-ml-[230px]">Product Name</p>
        <p className="-ml-[188px]">Quantity</p>
      </div>
      <div className="listproduct-allproducts">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No products available
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-4 gap-4 py-4 border-b border-gray-200 hover:bg-gray-50"
            >
              <p className="text-gray-900 flex items-center">{product.id}</p> {/* Display Product ID */}
              <div className="flex items-center -ml-[150px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
              </div>
              <p className="text-gray-900 flex items-center -ml-[230px]">{product.name}</p>
              <div className="flex items-center -ml-[200px]">
                <button
                  className={`bg-gray-300 text-gray-600 w-8 h-8 flex items-center justify-center rounded-full pb-0.5 
                    ${product.quantity <= 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"}`}
                  onClick={() => updateQuantity(product.id, product.quantity - 1)}
                  disabled={product.quantity <= 0}
                >
                  -
                </button>
                <span className="mx-2">{product.quantity}</span>
                <button
                  className="bg-gray-300 text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-400 pb-0.5"
                  onClick={() => updateQuantity(product.id, product.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductQuantity;
