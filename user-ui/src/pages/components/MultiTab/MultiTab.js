import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './MultiTab.module.scss';

const cx = classNames.bind(styles);

function MultiTab({ data }) {
  const [tabIndex, setTabIndex] = useState(0);

  const renderHeader = data.map((item, index) => {
    return (
      <div
        key={index}
        className={tabIndex === index ? cx('header', 'active') : cx('header')}
        onClick={() => {
          setTabIndex(index);
        }}
      >
        <p>{item.title}</p>
      </div>
    );
  });

  const renderContent = data.map((item, index) => {
    return (
      tabIndex === index && (
        <div key={index} className={cx('content')}>
          <item.component />
        </div>
      )
    );
  });

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('header-wrapper')}>{renderHeader}</div>
        <div className={cx('content-wrapper')}>{renderContent}</div>
      </div>
    </>
  );
}

export default MultiTab;
