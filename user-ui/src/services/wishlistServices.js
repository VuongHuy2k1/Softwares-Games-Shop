import Cookies from 'js-cookie';
import { httpRequest } from 'src/utils';
export const getWishlist = async () => {
  try {
    const jwt_token = Cookies.get('jwt');
    const userId = Cookies.get('user-id');
    const res = await httpRequest.get(`wishlist/UserID?UserID=${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    });
    return res;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { resultObj: [], message: error.message, isSuccess: false };
    }
    console.log(error);
    return { resultObj: [], message: error.response.data.message, isSuccess: false };
  }
};

export const removeWishlist = async (id) => {
  try {
    const jwt_token = Cookies.get('jwt');
    const userId = Cookies.get('user-id');
    const res = await httpRequest.remove(`wishlist/UserID?UserID=${userId}`, {
      data: id,
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { resultObj: [], message: error.message, isSuccess: false };
    }
    console.log(error);
    return { resultObj: [], message: error.response.data.message, isSuccess: false };
  }
};

export const addToWishlist = async (id) => {
  try {
    const jwt_token = Cookies.get('jwt');
    const userId = Cookies.get('user-id');
    const res = await httpRequest.post(`wishlist/UserID?UserID=${userId}`, id, {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { resultObj: [], message: error.message, isSuccess: false };
    }
    console.log(error);
    return { resultObj: [], message: error.response.data.message, isSuccess: false };
  }
};
