import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import MultiTab from 'src/pages/components/MultiTab';

import styles from './SettingTab.module.scss';
import { Items } from './Tabs';

const cx = classNames.bind(styles);

function SettingTab() {
  return (
    <>
      <div className={cx('wrapper')}>
        <h2 className={cx('title')}>
          <FontAwesomeIcon icon={faGear} className={cx('icon')} />
          setting
        </h2>
        <div className={cx('container')}>
          <MultiTab data={Items} />
        </div>
      </div>
    </>
  );
}

export default SettingTab;
