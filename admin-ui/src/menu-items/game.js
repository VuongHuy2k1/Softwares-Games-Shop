import { GrGamepad, GrAddCircle } from 'react-icons/gr';

// icons
const icons = {
    GrGamepad,
    GrAddCircle
};
// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const game = {
    id: 'game',
    title: 'Game',
    type: 'group',
    children: [
        {
            id: 'list-game',
            title: 'List game',
            type: 'item',
            url: '/list-game',
            icon: icons.GrGamepad
        },
        {
            id: 'new-game',
            title: 'New game',
            type: 'item',
            url: '/new-game',
            icon: icons.GrAddCircle
        }
    ]
};

export default game;
