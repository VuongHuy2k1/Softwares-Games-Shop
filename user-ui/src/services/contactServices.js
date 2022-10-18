import { httpRequest } from 'src/utils';

export const contact = async (payload) => {
  try {
    const res = await httpRequest.post('contact', payload);
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false };
    }
    return { message: error.response.data.message, isSuccess: false };
  }
};
