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

      switch (_title) {
        case 'best seller': {
          setTitle('Bán Chạy');
          break;
        }
        case 'specials': {
          setTitle('Khuyến mãi');
          break;
        }
        case 'latest': {
          setTitle('Sản phẩm mới');
          break;
        }
        default: {
          setTitle('Tất cả sản phẩm');
          break;
        }
      }
    } else {
      setTitle('Tất cả sản phẩm');
    }
  }, [keyword]);

  return (
    <>
      <StoreNav />
      <ProductList pagination={true} typePage={'products'} title={`${title} - Trang ${page || 1}`} />
    </>
  );
}

export default Products;
