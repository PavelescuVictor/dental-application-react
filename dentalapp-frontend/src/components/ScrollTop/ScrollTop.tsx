import { useState } from 'react';
import { Button } from 'components';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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
            <ExpandLessIcon className="arrow-up" />
          </Button>
        </StyledScrollTop>
      )}
    </>
  );
};

export default ScrollTop;
