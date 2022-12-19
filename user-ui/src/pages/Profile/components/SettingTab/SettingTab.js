import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import MultiTabMini from 'src/pages/components/MultiTabMini';
import styles from './SettingTab.module.scss';
import { Items } from './Tabs';

const cx = classNames.bind(styles);

function SettingTab() {
  return (
    <>
      <div className={cx('wrapper')}>
        <h2 className={cx('title')}>
          <FontAwesomeIcon icon={faGear} className={cx('icon')} />
          cài đặt
        </h2>
        <div className={cx('container')}>
          <MultiTabMini data={Items} />
        </div>
      </div>
    </>
  );
}

export default SettingTab;
