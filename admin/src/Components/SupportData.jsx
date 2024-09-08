import React, { useEffect, useState } from "react";
import delete_icon from '../assets/delete_icon.svg';

const SupportData = () => {
  const [supportRequests, setSupportRequests] = useState([]);
  const baseURL =  import.meta.env.VITE_API_URL;

  const fetchSupportData = async () => {
    try {
      const response = await fetch(`${baseURL}/supportdatafetch`);
      const result = await response.json();
      if (result.success) {
        setSupportRequests(result.data); // Access 'data' field from the response
      } else {
        console.error("Failed to fetch support requests");
      }
    } catch (error) {
      console.error("Error fetching support requests:", error);
    }
  };

  useEffect(() => {
    fetchSupportData();
  }, []);

  const removeSupportRequest = async (id) => {
    try {
      const response = await fetch(`${baseURL}/removesupport`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Support request removed successfully");
        setSupportRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== id)
        );
      } else {
        console.error("Failed to remove support request");
      }
    } catch (error) {
      console.error("Error removing support request:", error);
    }
  };

  return (
    <div className="support-data max-w-[1230px] mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Support Requests</h1>
      <p className="text-lg font-semibold mb-4">Total requests: {supportRequests.length}</p>
      <div className="support-data-format grid grid-cols-6 gap-4 py-2 bg-gray-100 text-gray-700 font-semibold" style={{ gridTemplateColumns: '1fr 1.2fr 1fr 1fr 2.5fr 0.5fr' }}>
        <p>Name</p>
        <p className="">Email</p>
        <p>Phone Number</p>
        <p>Product ID</p>
        <p>Issue Description</p>
        <p className="ml-2">Remove</p>
      </div>
      <div className="support-data-list">
        {supportRequests.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No support requests available</p>
        ) : (
          supportRequests.map((request) => (
            <div key={request._id} className="support-data-item grid grid-cols-6 gap-4 py-4 border-b border-gray-200 hover:bg-gray-50" style={{ gridTemplateColumns: '1fr 1.2fr 1fr 1fr 2.5fr 0.5fr' }}>
              <p className="text-gray-900 flex items-center">{request.name}</p>
              <p className="text-gray-600 flex items-center">{request.email}</p>
              <p className="text-gray-900 flex items-center">{request.phoneNumber}</p>
              <p className="text-gray-600 flex items-center">{request.productId}</p>
              <p className="text-gray-900 flex items-center">{request.issueDescription}</p>
              <button onClick={() => removeSupportRequest(request._id)} className="flex items-center justify-center p-2 hover:bg-red-100 rounded-full">
                <img src={delete_icon} alt="Delete" className="w-6 h-6" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SupportData;
