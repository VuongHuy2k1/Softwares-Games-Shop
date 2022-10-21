import styles from './Sidebar.module.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
// import { DarkModeContext } from '../../context/darkModeContext';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    // const { dispatch } = useContext(DarkModeContext);
    return (
        <div className={cx('sidebar')}>
            <div className={cx('top')}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span className={cx('logo')}>lamadmin</span>
                </Link>
            </div>
            <hr />
            <div className={cx('center')}>
                <ul>
                    <p className={cx('title')}>MAIN</p>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <li>
                            <DashboardIcon className={cx('icon')} />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className={cx('title')}>LISTS</p>
                    <Link to="/users" style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonOutlineIcon className={cx('icon')} />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/products" style={{ textDecoration: 'none' }}>
                        <li>
                            <StoreIcon className={cx('icon')} />
                            <span>Products</span>
                        </li>
                    </Link>
                    <li>
                        <CreditCardIcon className={cx('icon')} />
                        <span>Orders</span>
                    </li>
                    <li>
                        <LocalShippingIcon className={cx('icon')} />
                        <span>Delivery</span>
                    </li>
                    <p className={cx('title')}>USEFUL</p>
                    <li>
                        <InsertChartIcon className={cx('icon')} />
                        <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsNoneIcon className={cx('icon')} />
                        <span>Notifications</span>
                    </li>
                    <p className={cx('title')}>SERVICE</p>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon className={cx('icon')} />
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyOutlinedIcon className={cx('icon')} />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className={cx('icon')} />
                        <span>Settings</span>
                    </li>
                    <p className={cx('title')}>USER</p>
                    <li>
                        <AccountCircleOutlinedIcon className={cx('icon')} />
                        <span>Profile</span>
                    </li>
                    <li>
                        <ExitToAppIcon className={cx('icon')} />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className={cx('bottom')}>
                {/* <div className={cx("colorOption" onClick={() => dispatch({ type: 'LIGHT' })}></div>
                <div className={cx("colorOption" onClick={() => dispatch({ type: 'DARK' })}></div> */}
            </div>
        </div>
    );
}

export default Sidebar;
