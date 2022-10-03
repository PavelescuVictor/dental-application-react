import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Menu, Link } from 'components';
import { transitionTypes, withTransition } from 'hocs/withTransition/withTransition';
import StyledNavbar from './Navbar.style';

const LOGO_TITLE = 'eviDent';

// Size in percentage for hiding the navbar
const navbarVisibilityThreshold = 10;

const Navbar = (props): JSX.Element => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  const navigate = useNavigate();
  const handleOnClickEvent = (redirectPath: string) => {
    navigate(redirectPath);
  };

  useEffect(() => {
    if (isVisible) props.mountedCallback();
  }, [isVisible]);

  useEffect(() => {
    if (shouldUnmount) {
      setTimeout(() => setIsVisible(false), 200);
      props.unmountedCallback();
    }
  }, [shouldUnmount]);

  const navbarVisibilityController = () => {
    const scrollPercentage = (window.scrollY / window.innerHeight) * 100;
    if (scrollPercentage > navbarVisibilityThreshold && isVisible === true) setShouldUnmount(true);
    else if (scrollPercentage <= navbarVisibilityThreshold && isVisible === false) {
      setIsVisible(true);
      setShouldUnmount(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', navbarVisibilityController);
    return () => {
      window.removeEventListener('scroll', navbarVisibilityController);
    };
  });

  if (!isVisible) return <></>;

  return (
    <>
      {isVisible && (
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
      )}
    </>
  );
};

export default withTransition(transitionTypes.NAVBAR, Navbar);
