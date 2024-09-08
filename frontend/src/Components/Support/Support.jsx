import React, { useState, useEffect } from "react";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    productId: "",
    issueDescription: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const baseURL =  import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid email is required.";
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
      errors.phoneNumber = "A valid 10-digit phone number is required.";
    if (!formData.productId) errors.productId = "Product ID is required.";
    if (!formData.issueDescription) errors.issueDescription = "Issue description is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`${baseURL}/support`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitted(true);
          setServerError('');
          setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            productId: "",
            issueDescription: "",
          });
          setFormErrors({});
        } else {
          setServerError("Failed to submit the form. Please try again.");
        }
      } catch (error) {
        setServerError("Error submitting the form. Please try again.");
        console.error("Error submitting the form:", error);
      }
    }
  };
 
  // On Submitting Form page is automatically scroll to top
  useEffect(() => {
    if (submitted) {
      window.scrollTo(0, 0);
    }
  }, [submitted]);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="w-[60%] mx-auto border-2 p-12 bg-gray-50  mb-10">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Contact Us</h1>
        {submitted && (
          <div className="text-green-600 font-semibold mb-4">
            Your response has been recorded. Our team will contact you within 24 hours.
          </div>
        )}
        {serverError && (
          <div className="text-red-600 font-semibold mb-4">
            {serverError}
          </div>
        )}
        <div className="grid gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`w-full p-3 rounded border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className={`w-full p-3 rounded border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Your Phone Number"
              className={`w-full p-3 rounded border ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {formErrors.phoneNumber && <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Product ID</label>
            <input
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              placeholder="VO26T89YZE06"
              className={`w-full p-3 rounded border ${formErrors.productId ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {formErrors.productId && <p className="text-red-500 text-sm">{formErrors.productId}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Describe Your Issue</label>
            <textarea
              name="issueDescription"
              value={formData.issueDescription}
              onChange={handleChange}
              placeholder="Describe your issue in detail here..."
              rows="4"
              className={`w-full p-3 rounded border ${formErrors.issueDescription ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            ></textarea>
            {formErrors.issueDescription && <p className="text-red-500 text-sm">{formErrors.issueDescription}</p>}
          </div>
        </div>
        <button
          type="submit"
          className={`mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors ${submitted ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={submitted}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Support;
