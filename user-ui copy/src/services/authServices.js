import Cookies from 'js-cookie';

import { httpRequest } from 'src/utils';
import jwtDecode from 'jwt-decode';

export const login = async (user) => {
  try {
    const res = await httpRequest.post('Users/authenticate', user);
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false };
    }
    return { message: error.response.data.message, isSuccess: false };
  }
};

export const logout = () => {
  Cookies.remove('jwt');
  Cookies.remove('user-id');
};

export const isLoggedIn = () => {
  const jwt = Cookies.get('jwt');
  const userId = Cookies.get('user-id');
  if (jwt === undefined || userId === undefined) {
    Cookies.remove('jwt');
    Cookies.remove('user-id');

    return false;
  }

  try {
    const jwt_decode = jwtDecode(jwt);
    if (jwt_decode.NameIdentifier === userId) {
      return true;
    } else {
      Cookies.remove('jwt');
      Cookies.remove('user-id');
      return false;
    }
  } catch (error) {
    Cookies.remove('jwt');
    Cookies.remove('user-id');

    console.log(error);
    return false;
  }
};

export const register = async (account) => {
  try {
    const res = await httpRequest.post('Users/register', account);
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false };
    }
    console.log(error);
    return { message: error.response.data.message, isSuccess: false };
  }
};
export const registerCheck = async (account) => {
  try {
    const res = await httpRequest.post('Users/Confirm', account);
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false };
    }
    console.log(error);
    return { message: error.response.data.message, isSuccess: false };
  }
};
export const sendCode = async (account) => {
  try {
    const res = await httpRequest.post('Users/SendEmail', account);
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false };
    }
    console.log(error);
    return { message: error.response.data.message, isSuccess: false };
  }
};
