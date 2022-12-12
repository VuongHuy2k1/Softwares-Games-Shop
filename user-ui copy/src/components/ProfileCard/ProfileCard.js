//import PropTypes from 'prop-types';
import { faFacebook, faGithub, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './ProfileCard.module.scss';

const cx = classNames.bind(styles);
function ProfileCard({ data }) {
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('container')}>
          <h2 className={cx('header-title')}>{data.role}</h2>
          <h2 className={cx('title')}>Personal Infomation</h2>
          <div className={cx('line')}>
            <div className={cx('label')}>Fullname:</div>
            <div className={cx('text')}>{data.fullname}</div>
          </div>
          <div className={cx('line')}>
            <div className={cx('label')}>Date of Birth:</div>
            <div className={cx('text')}>{data.dateOfBirth}</div>
          </div>
          <div className={cx('line')}>
            <div className={cx('label')}>Address:</div>
            <div className={cx('text')}>{data.address}</div>
          </div>
          <h2 className={cx('title')}>Contact Infomation</h2>
          <div className={cx('line')}>
            <div className={cx('label')}>Phone:</div>
            <div className={cx('text')}>{data.phone}</div>
          </div>
          <div className={cx('line')}>
            <div className={cx('label')}>Mail:</div>
            <div className={cx('text')}>{data.mail}</div>
          </div>
          <div className={cx('icon-container')}>
            <a href={data.githubLink} target={data.githubLink !== '#' ? '_blank' : '_self'} rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} className={cx('icon')} />
            </a>
            <a href={data.facebookLink} target={data.facebookLink !== '#' ? '_blank' : '_self'} rel="noreferrer">
              <FontAwesomeIcon icon={faFacebook} className={cx('icon')} />
            </a>
            <a href={data.intagramLink} target={data.intagramLink !== '#' ? '_blank' : '_self'} rel="noreferrer">
              <FontAwesomeIcon icon={faInstagram} className={cx('icon')} />
            </a>
            <a href={data.twitterLink} target={data.twitterLink !== '#' ? '_blank' : '_self'} rel="noreferrer">
              <FontAwesomeIcon icon={faTwitter} className={cx('icon')} />
            </a>
            <a href={data.youtubeLink} target={data.youtubeLink !== '#' ? '_blank' : '_self'} rel="noreferrer">
              <FontAwesomeIcon icon={faYoutube} className={cx('icon')} />
            </a>
          </div>
        </div>
        <div className={cx('avatar')}>
          <img src={data.avatar} alt="img" />
        </div>
      </div>
    </>
  );
}

//ProfileCard.propTypes = {}

export default ProfileCard;
