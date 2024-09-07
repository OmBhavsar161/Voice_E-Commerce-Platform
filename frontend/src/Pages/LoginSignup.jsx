import React from "react";

const LoginSignup = () => {
  return (
    <div className="w-full h-screen bg-indigo-100 flex items-center justify-center">
      <div className="w-[580px] bg-white py-10 px-16 rounded-lg shadow-lg">
        <h1 className="text-3xl my-6 mx-0">Sign Up</h1>
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-700 font-medium">Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              placeholder="Your Name" 
              className="text-black ring-1 ring-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="example@gmail.com" 
              className="text-black ring-1 ring-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="••••••••" 
              className="text-black ring-1 ring-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="bg-indigo-600 text-white ring-1 ring-indigo-500 px-4 py-2 rounded-full hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-700 mt-4">
            Continue
          </button> 
        </div>
        <p className="mt-6 text-center">Already have an account? <span className="text-blue-600 cursor-pointer">Login Here</span></p>
        <div className="flex items-center justify-center mt-4">
          <input type="checkbox" name="agree" id="agree" className="mr-2 mt-1 h-4 w-4"/>
          <p className="text-sm">By continuing, I agree to the <span className="text-blue-600 cursor-pointer">terms of use</span> & <span className="text-blue-600 cursor-pointer">privacy policy</span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
