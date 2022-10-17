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
        <h2 className={cx('header-title')}>System Requirements</h2>
        <div className={cx('container')}>
          <div className={cx('minimum-requirement')}>
            <ul>
              <li>
                <h2 className={cx('title')}>Minimum:</h2>
              </li>
              <li>{value.srm.additionalNotes}</li>
              <li>
                <strong>OS:</strong> {value.srm.os}
              </li>
              <li>
                <strong>Processor:</strong> {value.srm.processor}
              </li>
              <li>
                <strong>Memory:</strong> {value.srm.memory}
              </li>
              <li>
                <strong>Graphics:</strong> {value.srm.graphics}
              </li>
              <li>
                <strong>Storage:</strong> {value.srm.storage}
              </li>
              <li>
                <strong>Sound Card:</strong> {value.srm.soundcard}
              </li>
            </ul>
          </div>
          <div className={cx('recommended-requirement')}>
            <ul>
              <li>
                <h2 className={cx('title')}>Recommended:</h2>
              </li>
              <li>{value.srr.additionalNotes}</li>
              <li>
                <strong>OS:</strong> {value.srr.os}
              </li>
              <li>
                <strong>Processor:</strong> {value.srr.processor}
              </li>
              <li>
                <strong>Memory:</strong> {value.srr.memory}
              </li>
              <li>
                <strong>Graphics:</strong> {value.srr.graphics}
              </li>
              <li>
                <strong>Storage:</strong> {value.srr.storage}
              </li>
              <li>
                <strong>Sound Card:</strong> {value.srr.soundcard}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SystemRequirements;
