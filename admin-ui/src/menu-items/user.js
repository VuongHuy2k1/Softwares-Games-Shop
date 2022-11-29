// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';

// icons
const icons = {
    AiOutlineUserAdd,
    AiOutlineUser
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const user = {
    id: 'user',
    title: 'User',
    type: 'group',
    children: [
        {
            id: 'user-list',
            title: 'List user',
            type: 'item',
            url: '/user',
            icon: icons.AiOutlineUser
        },
        {
            id: 'new-user',
            title: 'New user',
            type: 'item',
            url: '/new-user',
            icon: icons.AiOutlineUserAdd
        }
    ]
};

export default user;
