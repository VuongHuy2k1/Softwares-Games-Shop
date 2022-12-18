// import { useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import StoreNav from 'src/pages/components/StoreNav';
import ProductList from '../components/ProductList';
import ProductListII from '../components/ProductListII';
function Search() {
  const { page, keyword } = useParams();

  return (
    <>
      <StoreNav />
      <ProductListII pagination={true} typePage={'search'} title={`Trang ${page || 1} - Tìm kiếm: "${keyword}"`} />
    </>
  );
}

export default Search;
