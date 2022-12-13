// import images from 'src/assets/images';

import Slider from 'src/pages/components/Slider';
import StoreNav from 'src/pages/components/StoreNav';
import ProductList from 'src/pages/components/ProductList';
import ProductListStyle from '../components/ProductListStyle';
import Sell from '../components/BestSell/Sell';
function Home() {
  document.title = 'STEM - Game Shop';

  return (
    <>
      <StoreNav />
      <Slider />
      <Sell />
      <ProductListStyle type={'latest'} title={'New Product'} />
      {/* <ProductListStyle type={'specials'} title={'Sales Now'} /> */}
      <ProductListStyle type={'best-seller'} title={'Best Seller'} />
      <ProductListStyle pagination={true} typePage={'products'} title={'All Product'} />
    </>
  );
}

export default Home;
