import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import for navigation
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/delete_icon.svg";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const stripePromise = loadStripe(
  "pk_test_51Pt0JJRsPZLVhKagcrJ3N3QjNLg5S2sYrF1Fy1MmdnsZzZ7KE9P76bWJcZIRNxAWvPuewGNm1vKbs9lLwPgkmBTG00jDIDyYo7"
);

// Define conversion rate from INR to USD
const INR_TO_USD_CONVERSION_RATE = 83.91; // Ensure this matches your backend rate

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Convert INR to USD and round to 2 decimal places
const convertINRToUSD = (amountInINR) => {
  return Math.round((amountInINR / INR_TO_USD_CONVERSION_RATE) * 100) / 100;
};

const CartItems = () => {
  const {
    all_product,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartAmountInUSD,
    updateCartItemQuantity,
  } = useContext(ShopContext);

  const [mongoProducts, setMongoProducts] = useState([]);
  const [address, setAddress] = useState(""); // State to store address
  const navigate = useNavigate(); // Initialize navigate
  const baseURL =  import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch products from MongoDB
    const fetchMongoProducts = async () => {
      try {
        const response = await fetch(`${baseURL}/allproducts`);
        if (response.ok) {
          const data = await response.json();
          setMongoProducts(data);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching products from MongoDB:", error);
      }
    };

    // Fetch address from user profile
    const fetchAddress = async () => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        try {
          const response = await fetch(`${baseURL}/user/profile`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setAddress(data.address || "Address not available"); // Set address state
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      }
    };

    fetchMongoProducts();
    fetchAddress(); // Call the fetchAddress function
  }, []);

  const combinedProducts = [...all_product, ...mongoProducts];

  const getProductById = (id) => {
    return combinedProducts.find((p) => p.id === Number(id));
  };

  const calculateTotalAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = getProductById(itemId);
      if (product && cartItems[itemId] > 0) {
        return total + product.new_price * cartItems[itemId];
      }
      return total;
    }, 0);
  };

  const calculateTotalAmountInUSD = () => {
    const totalAmountInINR = calculateTotalAmount();
    return convertINRToUSD(totalAmountInINR);
  };

  const makePayment = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      toast.error("Please login before proceeding", { autoClose: 2000 });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    // Check if address is null, empty, or contains only whitespace
  if (!address || address.trim() === "" || address === "Address not available") {
    toast.error("Please add your delivery address", { autoClose: 2000 });
    return; // Stop further execution
  }

    const stripe = await stripePromise;

    const body = {
      items: Object.keys(cartItems)
        .map((itemId) => {
          const product = getProductById(itemId);
          if (!product) {
            console.warn(`Product with ID ${itemId} not found`);
            return null; // Skip this item if product is not found
          }
          return {
            id: product.id,
            name: product.name,
            price: product.new_price,
            quantity: cartItems[itemId],
          };
        })
        .filter((item) => item && item.quantity > 0), // Filter out any null or invalid items
      totalAmountInUSD: calculateTotalAmountInUSD(),
    };

    console.log("Body for checkout session:", body);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `${baseURL}/create-checkout-session`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const session = await response.json();

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (error) {
        console.error("Error redirecting to Stripe Checkout:", error);
      }
    } catch (error) {
      console.error("Error creating payment session:", error);
    }
  };

  // const handleIncrement = (id) => {
  //   const product = getProductById(id);
  //   if (product) {
  //     if (cartItems[id] < product.quantity) { // Check against backend quantity
  //       updateCartItemQuantity(id, cartItems[id] + 1);
  //     } 
  //     // else {
  //     //   toast.error("Cannot exceed available quantity", { autoClose: 2000 });
  //     // }
  //   }
  // };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <div className="grid grid-cols-6 gap-4 font-semibold text-gray-700 border-b pb-4 border-gray-300">
        <p className="text-left pl-4">Products</p>
        <p className="text-left">Title</p>
        <p className="text-left ml-4">Price</p>
        <p className="text-left">Quantity</p>
        <p className="text-left">Total</p>
        <p className="text-left">Remove</p>
      </div>
      <hr className="my-4 border-gray-300" />
      {combinedProducts.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div
              key={e.id}
              className="grid grid-cols-6 gap-4 items-center py-4 border-b border-gray-300"
            >
              <img
                src={e.image}
                alt={e.name}
                className="w-24 object-cover rounded-md"
              />
              <p className="text-gray-800 font-medium">{e.name}</p>
              <p className="text-gray-800 font-medium ml-4">
                ₹{formatPrice(e.new_price)}
              </p>
              <button
                className="ml-2 w-12 h-12 flex items-center justify-center rounded-full hover:ring-2 hover:ring-green-400 active:bg-gray-300 bg-gray-200 text-gray-800 font-medium text-lg"
                onClick={() =>
                  updateCartItemQuantity(e.id, cartItems[e.id] + 1)
                }
              >
                {cartItems[e.id]}
              </button>

              <p className="text-gray-800 font-medium">
                ₹{formatPrice(e.new_price * cartItems[e.id])}
              </p>
              <img
                src={remove_icon}
                alt="Remove"
                className="w-6 h-6 cursor-pointer hover:text-red-600 transition-colors ml-4"
                style={{
                  filter:
                    "invert(26%) sepia(76%) saturate(7457%) hue-rotate(345deg) brightness(98%) contrast(101%)",
                }}
                onClick={() => removeFromCart(e.id)}
              />
            </div>
          );
        }
        return null;
      })}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            If you have a promo code, enter it here:
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Promo Code"
              className="w-full p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 text-white px-4 rounded-r-lg hover:bg-green-700 transition-colors">
              Submit
            </button>
          </div>
          <div className="mt-4">
            <div className="flex">
              <p className="mt-4 font-semibold text-lg">Delivery Address</p>
              <Link to="/profile">
                <button className="bg-green-600 text-white px-4 rounded-3xl hover:bg-green-700 transition-colors mt-[19px] ml-4">
                  Edit
                </button>
              </Link>
            </div>
            <p className="text-gray-800 mt-4">{address}</p>{" "}
            {/* Display address */}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Cart Totals
          </h1>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p>₹{formatPrice(calculateTotalAmount())}</p>
            </div>
            <hr />
            <div className="flex justify-between text-gray-600">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <p>Total (INR)</p>
              <p>₹{formatPrice(calculateTotalAmount())}</p>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <p>Total (USD)</p>
              <p>${calculateTotalAmountInUSD()}</p>
            </div>
            <button
              onClick={makePayment}
              className="bg-green-600 text-white py-3 rounded-lg w-full hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
// perfect code
