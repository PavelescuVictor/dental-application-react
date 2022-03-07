import { Menu } from 'components';
import StyledNavbar from './Navbar.style';

const LOGO_TITLE = 'eviDent';

const Navbar = (): JSX.Element => {
  console.log('Navbar');
  return (
    <StyledNavbar>
      <nav className="navbar__content">
        <div className="content__logo">
          <button type="button">
            <h4>{LOGO_TITLE}</h4>
          </button>
        </div>
        <Menu />
      </nav>
    </StyledNavbar>
  );
};

export default Navbar;
