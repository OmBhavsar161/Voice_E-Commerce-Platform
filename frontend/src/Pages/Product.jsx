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

  useEffect(() => {
    const localProduct = all_product.find((e) => e.id === Number(productId));

    if (localProduct) {
      setProduct(localProduct);
    } else {
      const fetchProductFromMongo = async () => {
        try {
          const response = await fetch(`http://localhost:4000/product/${productId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const productData = await response.json();
          setProduct(productData);
        } catch (error) {
          console.error("Error fetching product from MongoDB:", error);
          // Optionally handle or set fallback product here
        }
      };

      fetchProductFromMongo();
    }
  }, [productId, all_product]);

  if (!product) {
    return <div>Loading...</div>; // Show a loading state while fetching data
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
