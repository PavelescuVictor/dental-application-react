import { useNavigate } from 'react-router';
import { Menu, Link } from 'components';
import StyledNavbar from './Navbar.style';

const LOGO_TITLE = 'eviDent';

const Navbar = (): JSX.Element => {
  const navigate = useNavigate();
  const handleOnClickEvent = (redirectPath: string) => {
    navigate(redirectPath);
  };
  return (
    <StyledNavbar>
      <nav className="navbar__content">
        <div className="content__logo">
          <Link to="/" onClick={() => handleOnClickEvent('/')}>
            <h4>{LOGO_TITLE}</h4>
          </Link>
        </div>
        <Menu />
      </nav>
    </StyledNavbar>
  );
};

export default Navbar;
