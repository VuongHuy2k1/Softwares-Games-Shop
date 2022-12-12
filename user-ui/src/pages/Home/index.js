// import images from 'src/assets/images';

import Slider from 'src/pages/components/Slider';
import StoreNav from 'src/pages/components/StoreNav';
import ProductList from 'src/pages/components/ProductList';
import ProductListStyle from '../components/ProductListStyle';
import Sell from '../components/BestSell/Sell';
import BrowseByTag from '../components/BrowseByTag';
import BrowseByGen from '../components/BrowseByGen/BrowseGen';
function Home() {
  document.title = 'STEM - Game Shop';

  return (
    <>
      <StoreNav />
      <Slider />
      <Sell />
      <BrowseByTag />
      <ProductListStyle type={'latest'} title={'New Product'} />
      {/* <ProductListStyle type={'specials'} title={'Sales Now'} /> */}
      <BrowseByGen />
      <ProductListStyle type={'best-seller'} title={'Best Seller'} />
      {/* <ProductListStyle pagination={true} typePage={'products'} title={'All Product'} /> */}
    </>
  );
}

export default Home;
