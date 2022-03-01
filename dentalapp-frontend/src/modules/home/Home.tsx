import { Menu, Navbar, Banner, ScrollTop } from 'components';
import StyledHome from './Home.style';

const CURRENT_PAGE = 'HOME';

const Home = (): JSX.Element => {
  console.log('Home');
  return (
    <StyledHome>
      {/* <Navbar currentPage={CURRENT_PAGE} /> */}
      {/* <Banner /> */}
      <ScrollTop />
      {/* <Footer /> */}
    </StyledHome>
  );
};

export default Home;
