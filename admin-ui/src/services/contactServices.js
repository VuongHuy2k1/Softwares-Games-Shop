import { httpRequest } from 'utils/index';

export const getContact = async () => {
    try {
        const res = await httpRequest.get(`Contact`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
