import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../Context/ShopContext";
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import Loader from '../Pages/Loader'; // Import your loader component

const Product = () => {
  window.scrollTo(0, 0);
  
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Track the loading state
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Find product in local context (ShopContext)
    const localProduct = all_product.find((e) => e.id === Number(productId));

    // Function to fetch product data from MongoDB if not found locally
    const fetchProductFromMongo = async () => {
      try {
        setLoading(true); // Start loader when fetching starts

        if (localProduct) {
          // If product is found in local context, use it and stop loading
          setProduct(localProduct);
          setLoading(false); // Loader stops when local product is found
        } else {
          const response = await fetch(`${baseURL}/product/${productId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const productData = await response.json();
          setProduct(productData);
          setLoading(false); // Loader stops when data from API is fetched
        }
      } catch (error) {
        console.error("Error fetching product from MongoDB:", error);
        setLoading(false); // Stop loader on error
      }
    };

    // Initiate product fetching
    fetchProductFromMongo();

  }, [productId, all_product, baseURL]);

  // Render loader while loading
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts currentCategory={product?.category} /> {/* Pass the current product's category as a prop */}
    </div>
  );
}

export default Product;
