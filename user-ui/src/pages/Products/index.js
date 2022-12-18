import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import ProductList from '../components/ProductList';
import StoreNav from '../components/StoreNav';
import styles from './Products.module.scss';
import Slider from '../components/Slider';
import Sell from '../components/BestSell/Sell';
import BrowseByTag from '../components/BrowseByTag';
import ProductListII from '../components/ProductListII';

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
          setTitle('Thịnh hành');
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

      <ProductListII pagination={true} typePage={'products'} title={`${title} - Trang ${page || 1}`} />
    </>
  );
}

export default Products;
