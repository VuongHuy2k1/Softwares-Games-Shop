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
      {/* =======
      <ProductList type={'latest'} title={'New Product'} />
      <ProductList type={'specials'} title={'Sales Now'} />
      <ProductList type={'best-seller'} title={'Best Seller'} />
      <ProductList pagination={true} typePage={'products'} title={'Tất cả sản phẩm'} />
>>>>>>> 82ec5d29a7e22dda7b6b29a1d0aba781d6f81c75 */}
    </>
  );
}

export default Home;
