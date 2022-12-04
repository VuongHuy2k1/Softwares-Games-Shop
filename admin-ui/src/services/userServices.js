import Cookies from 'js-cookie';
import { httpRequest } from 'utils/index';

export const getUserTable = async (index, page) => {
    try {
        const res = await httpRequest.get(`Users/paging?PageIndex=${index}&PageSize=${page}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await httpRequest.remove(`Users/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getUserProfile = async (id) => {
    try {
        const res = await httpRequest.get(`Users/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const putUser = async (data) => {
    try {
        const res = await httpRequest.put(`Users`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getRole = async () => {
    try {
        const res = await httpRequest.get(`Roles`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const putRoleUser = async (id, role) => {
    try {
        const jwt_token = Cookies.get('jwt');
        const res = await httpRequest.put(`Users/${id}/roles`, role, {
            headers: {
                Authorization: `Bearer ${jwt_token}`
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

//
//
//
// old
export const editProfile = async (account) => {
    try {
        const res = await httpRequest.put('Users/', account);
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
                Authorization: `Bearer ${jwt_token}`
            }
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
                Authorization: `Bearer ${jwt_token}`
            }
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
