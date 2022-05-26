import { useState } from 'react';
import { Button } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import StyledScrollTop from './ScrollTop.style';

const ScrollTop = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(true);

  // const toggleIsVisible = () => {
  //   const scrolled = document.documentElement.scrollTop;
  //   if (scrolled > 300) {
  //     setIsVisible(true);
  //   } else if (scrolled <= 300) {
  //     setIsVisible(false);
  //   }
  // };

  const scrollTop = () => {
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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

export default ScrollTop;
