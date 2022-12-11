import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './SystemRequirements.module.scss';

const cx = classNames.bind(styles);
function SystemRequirements({ data }) {
  const [value, setValue] = useState(data);

  useEffect(() => {
    setValue(data);
  }, [data]);

  return value === undefined ? (
    <></>
  ) : (
    <>
      <div className={cx('wrapper')}>
        <h2 className={cx('header-title')}>YÊU CẦU HỆ THỐNG</h2>
        <div className={cx('container')}>
          <div className={cx('minimum-requirement')}>
            <ul className={cx('list')}>
              <li>
                <h2 className={cx('title')}>Tối thiểu:</h2>
              </li>
              <li>{value.srm.additionalNotes}</li>
              <li>
                <strong>Hẹ điều hành:</strong> {value.srm.os}
              </li>
              <li>
                <strong>Bộ xử lý:</strong> {value.srm.processor}
              </li>
              <li>
                <strong>Bộ nhớ:</strong> {value.srm.memory}
              </li>
              <li>
                <strong>Đồ họa:</strong> {value.srm.graphics}
              </li>
              <li>
                <strong>Lưu trữ:</strong> {value.srm.storage}
              </li>
              <li>
                <strong>Card âm thanh:</strong> {value.srm.soundcard}
              </li>
            </ul>
          </div>
          <div className={cx('recommended-requirement')}>
            <ul className={cx('list')}>
              <li>
                <h2 className={cx('title')}>Khuyến nghị:</h2>
              </li>
              <li>{value.srr.additionalNotes}</li>
              <li>
                <strong>Hệ điều hành:</strong> {value.srr.os}
              </li>
              <li>
                <strong>Bộ xử lý:</strong> {value.srr.processor}
              </li>
              <li>
                <strong>Bộ nhớ:</strong> {value.srr.memory}
              </li>
              <li>
                <strong>Đồ họa:</strong> {value.srr.graphics}
              </li>
              <li>
                <strong>Lưu trữ:</strong> {value.srr.storage}
              </li>
              <li>
                <strong>Card âm thanh:</strong> {value.srr.soundcard}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SystemRequirements;
