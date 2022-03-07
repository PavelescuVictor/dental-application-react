import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StyledFooter from './Footer.style';

const FOOTER_RIGHTS = '© 2020 Pavelescu Victor. All Rights Reserved';

const Footer = (): JSX.Element => (
  <StyledFooter>
    <div className="footer__content">
      <div className="content__links">
        <a href="http://www.facebook.com">
          <FontAwesomeIcon icon={['fab', 'facebook-f']} />
        </a>
        <a href="http://www.twitter.com">
          <FontAwesomeIcon icon={['fab', 'twitter']} />
        </a>
        <a href="http://www.youtube.com">
          <FontAwesomeIcon icon={['fab', 'youtube']} />
        </a>
        <a href="http://www.instagram.com">
          <FontAwesomeIcon icon={['fab', 'instagram']} />
        </a>
        <a href="http://www.linkedIn.com">
          <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
        </a>
      </div>
      <div className="content__rights">
        <h4>{FOOTER_RIGHTS}</h4>
      </div>
    </div>
  </StyledFooter>
);

export default Footer;
