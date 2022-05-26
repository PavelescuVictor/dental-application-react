import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import StyledFooter from './Footer.style';

const FOOTER_RIGHTS = '© 2020 Pavelescu Victor. All Rights Reserved';

const Footer = (): JSX.Element => (
  <StyledFooter>
    <div className="footer__content">
      <div className="content__links">
        <a href="http://www.facebook.com">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="http://www.twitter.com">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="http://www.youtube.com">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="http://www.instagram.com">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="http://www.linkedIn.com">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
      <div className="content__rights">
        <h4>{FOOTER_RIGHTS}</h4>
      </div>
    </div>
  </StyledFooter>
);

export default Footer;
