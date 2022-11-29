import { httpRequest } from 'utils';
import Cookies from 'js-cookie';

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

export const postNewGame = async (game) => {
    console.log(game, 'a');
    const jwt_token = Cookies.get('jwt');
    const formdata = new FormData();
    formdata.append('ThumbnailImage', game.ThumbnailImage);
    formdata.append('GameName', game.GameName);
    formdata.append('Price', game.Price);
    formdata.append('Discount', game.Discount);
    formdata.append('Description', game.Description);
    formdata.append('Gameplay', game.Gameplay);
    formdata.append('Genre', game.Genre);
    formdata.append('Status', game.Status);
    formdata.append('ThumbnailImage', game.ThumbnailImage);
    formdata.append('SRM.OS', game.SRM.OS);
    formdata.append('SRM.Processor', game.SRM.processor);
    formdata.append('SRM.Memory', game.SRM.memory);
    formdata.append('SRM.Graphics', game.SRM.graphics);
    formdata.append('SRM.Storage', game.SRM.atorage);
    formdata.append('SRM.AdditionalNotes', game.SRM.additionalNotes);
    formdata.append('SRM.Soundcard', game.SRM.soundcard);
    formdata.append('SRR.OS', game.SRR.OS);
    formdata.append('SRR.Processor', game.SRR.processor);
    formdata.append('SRR.Memory', game.SRR.memory);
    formdata.append('SRR.Graphics', game.SRR.graphics);
    formdata.append('SRR.Storage', game.SRR.storage);
    formdata.append('SRR.AdditionalNotes', game.SRR.additionalNotes);
    formdata.append('SRR.Soundcard', game.SRR.soundcard);
    const id = game.GameID;
    try {
        const res = await httpRequest.post(`Games`, formdata, {
            headers: {
                Authorization: `Bearer ${jwt_token}`
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getGenre = async () => {
    try {
        const res = await httpRequest.get(`Categories`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getProfileGame = async (id) => {
    try {
        const res = await httpRequest.get(`Games/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const putGame = async (game) => {
    const jwt_token = Cookies.get('jwt');
    const formdata = new FormData();
    formdata.append('Name', game.GameName);
    formdata.append('GameID', game.GameID);
    formdata.append('Price', game.Price);
    formdata.append('Discount', game.Discount);
    formdata.append('Description', game.Description);
    formdata.append('Gameplay', game.Gameplay);
    formdata.append('Status', game.Status);
    formdata.append('ThumbnailImage', game.ThumbnailImage);
    formdata.append('SRM.OS', game.SRM.os);
    formdata.append('SRM.Processor', game.SRM.processor);
    formdata.append('SRM.Memory', game.SRM.memory);
    formdata.append('SRM.Graphics', game.SRM.graphics);
    formdata.append('SRM.Storage', game.SRM.storage);
    formdata.append('SRM.AdditionalNotes', game.SRM.additionalNotes);
    formdata.append('SRM.Soundcard', game.SRM.soundcard);
    formdata.append('SRR.OS', game.SRR.os);
    formdata.append('SRR.Processor', game.SRR.processor);
    formdata.append('SRR.Memory', game.SRR.memory);
    formdata.append('SRR.Graphics', game.SRR.graphics);
    formdata.append('SRR.Storage', game.SRR.storage);
    formdata.append('SRR.AdditionalNotes', game.SRR.additionalNotes);
    formdata.append('SRR.Soundcard', game.SRR.soundcard);
    console.log(game.SRM);
    const id = game.GameID;
    try {
        const res = await httpRequest.put(`Games/${id}`, formdata);
        return res;
    } catch (error) {
        console.log(error);
    }
};
