import Cookies from 'js-cookie';
import { httpRequest } from 'src/utils';

export const getUserData = async (id) => {
  try {
    const res = await httpRequest.get(`users/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (account) => {
  try {
    const jwt_token = Cookies.get('jwt');
    const res = await httpRequest.put('Users/', account, {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false };
    }
    console.log(error);
    return { message: 'Updated Fail', isSuccess: false };
  }
};

export const changePassword = async (account) => {
  try {
    const jwt_token = Cookies.get('jwt');
    const res = await httpRequest.post('Users/changepassword', account, {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false };
    }
    console.log(error);
    return { message: error.response.data.message, isSuccess: false };
  }
};

export const forgotPassword = async (account) => {
  try {
    const res = await httpRequest.post('Users/forgotpassword', account);
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false };
    }
    console.log(error);
    return { message: error.response.data.message, isSuccess: false };
  }
};

export const changeAvatar = async (img) => {
  try {
    const jwt_token = Cookies.get('jwt');
    const userId = Cookies.get('user-id');
    const formdata = new FormData();
    formdata.append('imageFile', img);
    const res = await httpRequest.post(`users/avatar/${userId}`, formdata, {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false };
    }
    console.log(error);
    return { message: error.response.data.message, isSuccess: false };
  }
};

export const changeWallpaper = async (img) => {
  try {
    const jwt_token = Cookies.get('jwt');
    const userId = Cookies.get('user-id');
    const formdata = new FormData();
    formdata.append('imageFile', img);
    const res = await httpRequest.post(`users/thumbnail/${userId}`, formdata, {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false };
    }
    console.log(error);
    return { message: error.response.data.message, isSuccess: false };
  }
};
