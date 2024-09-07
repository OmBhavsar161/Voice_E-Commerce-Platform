import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col h-[80vh] items-center justify-center m-auto py-0 px-[140px] mb-[140px] gap-[30px] w-[85%] h-40vh] bg-gradient-to-b from-blue-400 via-purple-300 to-pink-200 p-8 rounded-lg">
      <h1 className="text-[55px] font-semibold">
        Get Exclusive Offers on Your Email{" "}
      </h1>
      <p className="font-[20px] text-zinc-700 font-semibold">
        Subscribe to our newsletter and stay updated
      </p>
      <div className="flex items-center justify-between bg-white  w-[730px] h-[70px]  rounded-[80px] border-2 border-yellow-900 hover:shadow-2xl hover:shadow-purple-600">
        <input
          type="email"
          placeholder="Your Email ID"
          className="w-[500px] ml-[30px] border-none outline-none text-gray-600 text-[16px] font-sriracha "
        />
        <button className="w-[170px] h-[70px] p-4 rounded-full bg-black text-white font-[16px] hover:ring-2 hover:ring-purple-600">Subscribe!</button>
      </div>
    </div>
  );
};

export default NewsLetter;
