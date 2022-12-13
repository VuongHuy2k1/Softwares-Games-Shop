import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import StoreNav from 'src/pages/components/StoreNav';
import ProductDetail from './components/ProductDetail';
import SystemRequirements from './components/SystemRequirements';
import * as productServices from 'src/services/productServices';

function Product() {
  document.title = 'Product';
  const { productId } = useParams();
  const [value, setValue] = useState(undefined);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await productServices.getProductById(productId);
      setValue(result);
    };

    fetchApi();
  }, [productId]);

  return (
    <>
      <StoreNav />
      <ProductDetail data={value} />
      <SystemRequirements data={value} />
    </>
  );
}

export default Product;
