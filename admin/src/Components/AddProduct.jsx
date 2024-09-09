import React, { useState } from "react";
import upload_area from "../assets/upload_area.svg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store the file
  const baseURL =  import.meta.env.VITE_API_URL;
  
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "smartwatch",
    new_price: "",
    old_price: "",
    off_percentage: "" // Added off_percentage field
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageFile(file); // Save the file
    }
  };

  const handleResetImage = () => {
    setImage(null);
    setImageFile(null); // Clear the file
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value
    });
  };

  const Add_product = async () => {
    if (!imageFile) {
      toast.error("No image selected", {
        autoClose: 5000,
        hideProgressBar: true
      });
      return;
    }

    const formData = new FormData();
    formData.append('product-vercel', imageFile); // Append the file with field name 'product' --------------------- change name here

    try {
      const uploadResponse = await fetch(`${baseURL}/upload`, {
        method: 'POST',
        body: formData
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        const updatedProduct = {
          ...productDetails,
          image: uploadData.image_url // Set the image URL
        };

        // Send product details with the image URL to backend
        const addProductResponse = await fetch(`${baseURL}/addproduct`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedProduct)
        });

        const addProductData = await addProductResponse.json();

        if (addProductData.success) {
          toast.success("Product added successfully", {
            autoClose: 5000, // Duration in milliseconds
            hideProgressBar: true
          });

          console.log("Product Details:", updatedProduct); // Print the whole object with all details

          // Reset form fields and image preview
          setProductDetails({
            name: "",
            image: "",
            category: "smartwatch",
            new_price: "",
            old_price: "",
            off_percentage: "" // Reset off_percentage field
          });

          setImage(null);
          setImageFile(null); // Clear the file

        } else {
          toast.error("Unable to add product", {
            autoClose: 5000, // Duration in milliseconds
            hideProgressBar: true
          });
          console.error("Error adding product:", addProductData.message);
        }
      } else {
        toast.error("Error uploading image", {
          autoClose: 5000, // Duration in milliseconds
          hideProgressBar: true
        });
        console.error("Error uploading image:", uploadData.message);
      }
    } catch (error) {
      toast.error("Error in adding product", {
        autoClose: 5000, // Duration in milliseconds
        hideProgressBar: true
      });
      console.error("Error in adding product:", error);
    }
  };

  return (
    <div className="add-product max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-8">
      <div className="add-product-itemfield">
        <p className="text-lg font-semibold text-gray-700 mb-2">Product Title</p>
        <input
          type="text"
          name="name"
          placeholder="Type Here"
          value={productDetails.name}
          onChange={changeHandler}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="add-product-price flex space-x-4">
        <div className="add-procuct-item-fields flex-1">
          <p className="text-lg font-semibold text-gray-700 mb-2">Old Price</p>
          <input
            type="number"
            name="old_price"
            placeholder="Enter Old Price"
            value={productDetails.old_price}
            onChange={changeHandler}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="add-procuct-item-fields flex-1">
          <p className="text-lg font-semibold text-gray-700 mb-2">Current Price</p>
          <input
            type="number"
            name="new_price"
            placeholder="Enter Current Price"
            value={productDetails.new_price}
            onChange={changeHandler}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="add-product-itemfield">
        <p className="text-lg font-semibold text-gray-700 mb-2">Discount Percentage</p>
        <input
          type="number"
          name="off_percentage"
          placeholder="Enter Discount in %"
          value={productDetails.off_percentage}
          onChange={changeHandler}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="add-product-itemfield">
        <p className="text-lg font-semibold text-gray-700 mb-2">Product Category</p>
        <select
          name="category"
          value={productDetails.category}
          onChange={changeHandler}
          className="add-product-selector mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="smartwatch">SmartWatch</option>
          <option value="headphones">Headphones</option>
          <option value="tws">TWS</option>
        </select>
      </div>
      <div className="addproduct-item-field relative">
        <label htmlFor="file-input" className="cursor-pointer">
          {image ? (
            <>
              <img
                src={image}
                alt="Uploaded"
                className="addproduct-thumbnail-image w-24 h-24 object-cover mx-auto rounded-md"
              />
              <button
                type="button"
                onClick={handleResetImage}
                className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 pb-1 flex items-center justify-center"
              >
                &times;
              </button>
            </>
          ) : (
            <img
              src={upload_area}
              alt="Upload area"
              className="addproduct-thumbnail-image w-24 h-24 object-cover mx-auto"
            />
          )}
        </label>
        <input
          type="file"
          name="image"
          id="file-input"
          onChange={handleImageChange}
          hidden
        />
      </div>
      <button
        onClick={Add_product}
        className="addproduct-btn w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        ADD
      </button>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
