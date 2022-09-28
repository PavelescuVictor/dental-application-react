import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Menu, Link } from 'components';
import StyledNavbar from './Navbar.style';

const LOGO_TITLE = 'eviDent';

// Size in percentage for hiding the navbar
const navbarVisibilityThreshold = 10;

const Navbar = (): JSX.Element | null => {
  const navigate = useNavigate();
  const handleOnClickEvent = (redirectPath: string) => {
    navigate(redirectPath);
  };

  const [visible, setVisible] = useState(true);

  const navbarVisibilityController = () => {
    const scrollPercentage = (window.scrollY / window.innerHeight) * 100;
    if (scrollPercentage > navbarVisibilityThreshold && visible === true) setVisible(false);
    else if (scrollPercentage < navbarVisibilityThreshold && visible === false) setVisible(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', navbarVisibilityController);
    return () => {
      window.removeEventListener('scroll', navbarVisibilityController);
    };
  });

  if (!visible) return null;

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
