import { httpRequest } from 'utils';

export const getGameTable = async (index, page) => {
    try {
        const res = await httpRequest.get(`Games/paging?PageIndex=${index}&PageSize=${page}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteGame = async (id) => {
    try {
        const res = await httpRequest.remove(`Games/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
