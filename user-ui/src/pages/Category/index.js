import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import StoreNav from 'src/pages/components/StoreNav';
import ProductList from '../components/ProductList';
import * as categoryServices from 'src/services/categoryServices';
import CategoryItems from './component/CategoryItems';
import ProductListII from '../components/ProductListII';

function Category() {
  document.title = 'Category';
  const { genre, page } = useParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      const result = await categoryServices.getCategoryById(genre);
      setTitle(`Thể loại: ${result.name} - Trang ${page || 1}`);
    };

    if (genre !== undefined && genre !== 'undefined') {
      fetchApi();
    }
  }, [genre, page]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await categoryServices.getCategories();
      setCategories(result);
    };
    fetchApi();
  }, []);

  return (
    <>
      <StoreNav />
      {(genre === undefined && page === undefined) || (genre === 'undefined' && page === 'undefined') ? (
        <>
          <CategoryItems data={categories || []} />;
        </>
      ) : (
        <ProductListII pagination={true} typePage={'category'} title={title} />
      )}
    </>
  );
}

export default Category;
