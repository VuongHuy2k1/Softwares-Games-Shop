// import images from 'src/assets/images';

import Slider from 'src/pages/components/Slider';
import StoreNav from 'src/pages/components/StoreNav';
import ProductList from 'src/pages/components/ProductList';

function Home() {
  document.title = 'STEM - Game Shop';

  return (
    <>
      <StoreNav />
      <Slider />
      <ProductList type={'latest'} title={'Latest Product'} />
      <ProductList type={'specials'} title={'Sales Now'} />
      <ProductList type={'best-seller'} title={'Best Seller'} />
      <ProductList pagination={true} typePage={'products'} title={'All Product'} />
    </>
  );
}

export default Home;
