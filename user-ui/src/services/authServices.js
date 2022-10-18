<<<<<<< HEAD
import Cookies from "js-cookie";
import { httpRequest } from "../utils";
import jwtDecode from "jwt-decode";

export const login = async (user) => {
  try {
    const res = await httpRequest.post("Users/authenticate", user);
    return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
=======
import Cookies from 'js-cookie';

import { httpRequest } from 'src/utils';
import jwtDecode from 'jwt-decode';

export const login = async (user) => {
  try {
    const res = await httpRequest.post('Users/authenticate', user);
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
      return { message: error.message, isSuccess: false };
    }
    return { message: error.response.data.message, isSuccess: false };
  }
};

export const logout = () => {
<<<<<<< HEAD
  Cookies.remove("jwt");
  Cookies.remove("user-id");
};

export const isLoggedIn = () => {
  const jwt = Cookies.get("jwt");
  const userId = Cookies.get("user-id");
  if (jwt === undefined || userId === undefined) {
    Cookies.remove("jwt");
    Cookies.remove("user-id");
=======
  Cookies.remove('jwt');
  Cookies.remove('user-id');
};

export const isLoggedIn = () => {
  const jwt = Cookies.get('jwt');
  const userId = Cookies.get('user-id');
  if (jwt === undefined || userId === undefined) {
    Cookies.remove('jwt');
    Cookies.remove('user-id');
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
    return false;
  }

  try {
    const jwt_decode = jwtDecode(jwt);
    if (jwt_decode.NameIdentifier === userId) {
      return true;
    } else {
<<<<<<< HEAD
      Cookies.remove("jwt");
      Cookies.remove("user-id");
      return false;
    }
  } catch (error) {
    Cookies.remove("jwt");
    Cookies.remove("user-id");
=======
      Cookies.remove('jwt');
      Cookies.remove('user-id');
      return false;
    }
  } catch (error) {
    Cookies.remove('jwt');
    Cookies.remove('user-id');
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
    console.log(error);
    return false;
  }
};

export const register = async (account) => {
  try {
<<<<<<< HEAD
    const res = await httpRequest.post("Users/register", account);
    return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
=======
    const res = await httpRequest.post('Users/register', account);
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
      return { message: error.message, isSuccess: false };
    }
    console.log(error);
    return { message: error.response.data.message, isSuccess: false };
  }
};
