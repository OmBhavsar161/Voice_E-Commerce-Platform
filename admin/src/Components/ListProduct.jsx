import React, { useEffect, useState } from "react";
import delete_icon from "../assets/delete_icon.svg";


const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Track which product is being edited
  const [editedProduct, setEditedProduct] = useState({}); // Store edited product details
  const baseURL =  import.meta.env.VITE_API_URL;
    
  const fetchInfo = async () => {
    try {
      const response = await fetch(`${baseURL}/allproducts`);
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const togglePopularStatus = async (productId, isPopular) => {
    try {
      const response = await fetch(`${baseURL}/togglePopular`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId, isPopular: !isPopular }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product status");
      }

      fetchInfo(); // Refetch products after updating
    } catch (error) {
      console.error("Error updating popular status:", error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await fetch(`${baseURL}/removeproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove product");
      }

      fetchInfo(); // Refetch products after removing
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const handleEditClick = (product) => {
    setIsEditing(product.id); // Set editing mode to this product
    setEditedProduct(product); // Initialize the edited product with current details
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${baseURL}/updateproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct), // Send updated details to the backend
      });

      if (!response.ok) {
        throw new Error("Failed to update product details");
      }

      fetchInfo(); // Refetch products after saving
      setIsEditing(null); // Exit editing mode
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="list-product max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">All Products List</h1>
      <p className="text-lg font-semibold mb-4">
        Total items available: {allProducts.length}
      </p>
      <div className="listproduct-format-main grid grid-cols-8 gap-4 py-2 bg-gray-100 text-gray-700 font-semibold">
        <p>Product Image</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p className="ml-10">Popular</p>
        <p className={isEditing ? "ml-[50px]" : "ml-10"}>
          {isEditing ? "Save" : "Actions"}
        </p>{" "}
        {/* Dynamic column heading */}
        <p className="ml-10">{isEditing ? "Discount (%)" : "Remove"}</p>{" "}
        {/* Dynamic column heading */}
      </div>
      <div className="listproduct-allproducts">
        {allProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No products available
          </p>
        ) : (
          allProducts.map((product) => (
            <div
              key={product.id}
              className="listproduct-formatemain grid grid-cols-8 gap-4 py-6 border-b border-gray-200 hover:bg-gray-50"
            >
              <div className="flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md mr-16"
                />
              </div>
              {isEditing === product.id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleChange}
                    className="text-gray-900 flex items-center"
                  />
                  <input
                    type="number"
                    name="old_price"
                    value={editedProduct.old_price}
                    onChange={handleChange}
                    className="text-gray-600 flex items-center"
                  />
                  <input
                    type="number"
                    name="new_price"
                    value={editedProduct.new_price}
                    onChange={handleChange}
                    className="text-gray-900 font-semibold flex items-center"
                  />
                  <select
                    name="category"
                    value={editedProduct.category}
                    onChange={handleChange}
                    className="text-gray-500 capitalize flex items-center"
                  >
                    <option value="smartwatch">Smartwatch</option>
                    <option value="headphones">Headphones</option>
                    <option value="tws">TWS</option>
                  </select>

                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={editedProduct.popular}
                      onChange={() =>
                        togglePopularStatus(product.id, product.popular)
                      }
                      
                    />
                  </div>
                  <button
                    onClick={handleSaveClick}
                    className="flex items-center justify-center p-2 bg-green-100 hover:bg-green-200 rounded-full"
                  >
                    Save
                  </button>
                  <input
                    type="number"
                    name="off_percentage"
                    value={editedProduct.off_percentage || ""}
                    onChange={handleChange}
                    className="text-black flex items-center ml-10 font-bold "
                    placeholder="Enter discount"
                  />
                </>
              ) : (
                <>
                  <p className="text-gray-900 flex items-center">
                    {product.name}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    ₹{product.old_price}
                  </p>
                  <p className="text-gray-900 font-semibold flex items-center">
                    ₹{product.new_price}
                  </p>
                  <p className="text-gray-500 capitalize flex items-center">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={product.popular}
                      onChange={() =>
                        togglePopularStatus(product.id, product.popular)
                      }
                    />
                  </div>
                  <button
                    onClick={() => handleEditClick(product)}
                    className="flex items-center justify-center p-2 hover:bg-blue-100 rounded-full"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="flex items-center justify-center p-2 hover:bg-red-100 rounded-full"
                  >
                    <img src={delete_icon} alt="Delete" className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListProduct;
