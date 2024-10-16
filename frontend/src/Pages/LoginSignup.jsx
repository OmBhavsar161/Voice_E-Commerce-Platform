import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const baseURL = import.meta.env.VITE_API_URL;
  const AdminPanelUrl = import.meta.env.VITE_ADMINPANEL_URL; // Admin Panel URL

  // Reset scroll position when toggling between Sign Up and Login
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isSignup]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, agreeTerms } = formData;
    const newErrors = {};

    if (isSignup) {
      if (!name) newErrors.name = 'Name is required.';
      if (!email) newErrors.email = 'Email is required.';
      if (!password) newErrors.password = 'Password is required.';
      if (!agreeTerms) newErrors.agreeTerms = 'Please agree to terms and conditions.';
    } else {
      if (!email) newErrors.email = 'Email is required.';
      if (!password) newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const url = isSignup ? `${baseURL}/signup` : `${baseURL}/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Something went wrong', { autoClose: 3000 });
        throw new Error(errorData.error || 'Something went wrong');
      }
 
      const data = await response.json();
      toast.success(isSignup ? 'Sign Up successful!' : 'Login successful!', { autoClose: 3000 });

      if (!isSignup) {
        // Delay the redirection by 2 seconds for login
        setTimeout(() => {
          localStorage.setItem('authToken', data.token); // Store the token in local storage

          // Check if the logged-in user is the admin
          if (email === 'adminvoice@gmail.com') {
            window.open(AdminPanelUrl, '_blank'); // Open the admin panel in a new tab
            window.location.replace("/");
            
          } else {
            window.location.replace("/"); // Redirect normal users to homepage
          }
        }, 3000);
      } else {
        // Redirect to login page after signup success
        setTimeout(() => {
          setIsSignup(false); // Switch to login view
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen bg-indigo-100 flex items-center justify-center">
      <div className="w-[580px] bg-white py-8 px-16 rounded-lg shadow-lg">
        <h1 className="text-3xl mt-4 mb-14 mx-0">{isSignup ? 'Sign Up' : 'Login'}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
          {isSignup && (
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-gray-700 font-medium">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Your Name" 
                className="text-black ring-1 ring-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="example@gmail.com" 
              className="text-black ring-1 ring-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="••••••••" 
              className="text-black ring-1 ring-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          {isSignup && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  name="agreeTerms" 
                  id="agreeTerms" 
                  className={`mr-2 mt-1 h-4 w-4 ${errors.agreeTerms ? 'border-red-500' : ''}`}
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <label htmlFor="agreeTerms" className="text-sm">
                  I agree to the <span className="text-blue-600 cursor-pointer">terms of use</span> & <span className="text-blue-600 cursor-pointer">privacy policy</span>
                </label>
              </div>
              {errors.agreeTerms && <p className="text-red-500">{errors.agreeTerms}</p>}
            </div>
          )}
          <button 
            type="submit" 
            className="bg-indigo-600 text-white ring-1 ring-indigo-500 px-4 py-2 rounded-full hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-700 mt-4"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-center">
          {isSignup ? (
            <span>Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setIsSignup(false)}>Login Here</span></span>
          ) : (
            <span>Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setIsSignup(true)}>Create one</span></span>
          )}
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
