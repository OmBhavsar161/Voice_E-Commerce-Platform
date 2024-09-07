import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../Context/ShopContext";
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const localProduct = all_product.find((e) => e.id === Number(productId));

    if (localProduct) {
      setProduct(localProduct);
      setLoading(false);
    } else {
      const fetchProductFromMongo = async () => {
        try {
          const response = await fetch(`https://ecom-vercel-backend.vercel.app/product/${productId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const productData = await response.json();
          setProduct(productData);
        } catch (error) {
          console.error("Error fetching product from MongoDB:", error);
          setError("Failed to load product details.");
        } finally {
          setLoading(false);
        }
      };

      fetchProductFromMongo();
    }
  }, [productId, all_product]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there is an error
  }

  if (!product) {
    return <div>Product not found.</div>; // Show a message if the product is not found
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
}

export default Product;
