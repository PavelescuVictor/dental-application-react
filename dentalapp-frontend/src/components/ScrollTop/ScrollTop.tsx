import { useState, useEffect } from 'react';
import { Button } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { transitionTypes, withTransition } from 'hocs/withTransition/withTransition';
import StyledScrollTop from './ScrollTop.style';

const scrollTopVisibilityThreshold = 10;

const ScrollTop = (props): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  const scrollTop = () => {
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (isVisible) props.mountedCallback();
  }, [isVisible]);

  useEffect(() => {
    if (shouldUnmount) {
      setTimeout(() => setIsVisible(false), 650);
      props.unmountedCallback();
    }
  }, [shouldUnmount]);

  const navbarVisibilityController = () => {
    const scrollPercentage = (window.scrollY / window.innerHeight) * 100;
    if (scrollPercentage > scrollTopVisibilityThreshold && isVisible === false) {
      setIsVisible(true);
      setShouldUnmount(false);
    } else if (scrollPercentage <= scrollTopVisibilityThreshold && isVisible === true)
      setShouldUnmount(true);
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
        <StyledScrollTop>
          <Button className="scroll-top-button" action={scrollTop}>
            <FontAwesomeIcon className="arrow-up" icon={faChevronUp} />
          </Button>
        </StyledScrollTop>
      )}
    </>
  );
};

export default withTransition(transitionTypes.SCROLL_TOP, ScrollTop);
