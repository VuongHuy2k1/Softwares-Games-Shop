import Cookies from 'js-cookie';
import { httpRequest } from 'src/utils';
export const checkout = async () => {
  try {
    const jwt_token = Cookies.get('jwt');
    const userId = Cookies.get('user-id');
    const res = await httpRequest.post(
      `checkouts/UserID?UserID=${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { resultObj: [], message: error.message, isSuccess: false };
    }
    console.log(error);
    return { resultObj: [], message: error.response.data.message, isSuccess: false };
  }
};

export const getCheckout = async () => {
  try {
    const jwt_token = Cookies.get('jwt');
    const userId = Cookies.get('user-id');
    const res = await httpRequest.get(`checkouts/paging/${userId}?PageIndex=1&PageSize=200`, {
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
