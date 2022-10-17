import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import StoreNav from '../components/StoreNav';

function Products() {
  document.title = 'All product';
  const { keyword, page } = useParams();
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (keyword !== undefined) {
      const tmp = keyword.split('-');
      const _title = tmp.join(' ');
      if (_title === 'best seller' || _title === 'specials' || _title === 'latest') {
        setTitle(_title);
      } else {
        setTitle('all');
      }
    }
  }, [keyword]);

  return (
    <>
      <StoreNav />
      <ProductList pagination={true} typePage={'products'} title={`${title || 'all'} products - Page ${page || 1}`} />
    </>
  );
}

export default Products;
