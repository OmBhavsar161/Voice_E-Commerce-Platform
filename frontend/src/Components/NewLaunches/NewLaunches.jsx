import React from "react";
import hand_icon from "../Assets/hand_icon.png";
import smart_ring from "../Assets/smartring.png";
import NewCollections from "../NewCollections/NewCollections";
import Offers from "../Offers/Offers";
import Popular from "../Popular/Popular";

const NewLaunches = () => {
  return (<>
    <div className="flex h-[100vh] bg-gradient-to-b from-[#a4ff8055] via-[#80fffd55] to-[#f3f4f690] font-sriracha">
      <div className="flex-1 flex-col gap-[200px] justify-center leading-[1.3] mt-10 ml-20">
        <h2 className="text-black text-[26px] font-semibold mb-6">NEW LAUNCHES SMART RING</h2>
        {/* <hr className="border-none h-[2px] bg-red-500 mt-[-10px] w-[360px] mb-4"/> */}
        <div>
          <div className="flex align-middle gap-[20px]">
            <p className="text-black text-[100px] font-bold">New</p>
            {/* <img src={hand_icon} alt="" className="w-[105px]" /> */}
          </div>
          <p className="text-black text-[100px] font-bold">Launches</p>
          <p className="text-black text-[100px] font-bold">Coming Soon...</p>
        </div>
        <div className="group flex justify-center items-center gap-[15px] w-[310px] h-[70px] rounded-[75px] mt-[30px] bg-red-600 text-white text-[22px] font-medium hover:bg-white hover:text-red-600 hover:ring-4 ring-red-600">
          <div>Latest Collections</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="mt-1 ml-4 transition-colors duration-300"
            style={{
              stroke: 'white', // Default color
              transition: 'stroke 0.3s ease'
            }}
          >
            <path
              d="M14.43 5.93L20.5 12l-6.07 6.07M3.5 12h16.83"
              stroke="currentColor" // Uses current text color
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.5"
            ></path>
          </svg>
        </div>
      </div>
      <div className="flex-1  items-center justify-center mt-10">
        <img src={smart_ring} alt="" />
      </div>
    </div>
    <NewCollections />
    <Offers />
    <Popular />
    </>
  );
};

export default NewLaunches;
