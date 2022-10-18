// import { useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import StoreNav from 'src/pages/components/StoreNav';
import ProductList from '../components/ProductList';
function Search() {
  const { page, keyword } = useParams();

  return (
    <>
      <StoreNav />
      <ProductList pagination={true} typePage={'search'} title={`Page ${page || 1} - Search: ${keyword}`} />
    </>
  );
}

export default Search;
