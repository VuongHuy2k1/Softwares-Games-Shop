import { httpRequest } from 'src/utils';

export const getCategories = async () => {
  try {
    const res = await httpRequest.get('Categories');
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (id) => {
  try {
    const res = await httpRequest.get(`categories/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
