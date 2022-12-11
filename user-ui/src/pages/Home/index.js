// import images from 'src/assets/images';

import Slider from 'src/pages/components/Slider';
import StoreNav from 'src/pages/components/StoreNav';
import ProductList from 'src/pages/components/ProductList';
import Sell from '../components/BestSell/Sell';
function Home() {
  document.title = 'STEM - Game Shop';

  return (
    <>
      <StoreNav />
      <Slider />
      <Sell />
      <ProductList type={'latest'} title={'New Product'} />
      <ProductList type={'specials'} title={'Sales Now'} />
      <ProductList type={'best-seller'} title={'Best Seller'} />
      <ProductList pagination={true} typePage={'products'} title={'Tất cả sản phẩm'} />
    </>
  );
}

export default Home;
