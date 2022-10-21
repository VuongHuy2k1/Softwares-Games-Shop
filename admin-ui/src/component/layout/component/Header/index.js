import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('navbar')}>
            <div className={cx('wrapper')}>
                <div className={cx('search')}>
                    <input type="text" placeholder="Search..." />
                    <SearchOutlinedIcon />
                </div>
                <div className={cx('items')}>
                    <div className={cx('item')}>
                        <LanguageOutlinedIcon className={cx('icon')} />
                        English
                    </div>
                    <div className={cx('item')}>
                        {/* <DarkModeOutlinedIcon className={cx('icon')} onClick={() => dispatch({ type: 'TOGGLE' })} /> */}
                    </div>
                    <div className={cx('item')}>
                        <FullscreenExitOutlinedIcon className={cx('icon')} />
                    </div>
                    <div className={cx('item')}>
                        <NotificationsNoneOutlinedIcon className={cx('icon')} />
                        <div className={cx('counter')}>1</div>
                    </div>
                    <div className={cx('item')}>
                        <ChatBubbleOutlineOutlinedIcon className={cx('icon')} />
                        <div className={cx('counter')}>2</div>
                    </div>
                    <div className={cx('item')}>
                        <ListOutlinedIcon className={cx('icon')} />
                    </div>
                    <div className={cx('item')}>
                        <img
                            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            className={cx('avatar')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
