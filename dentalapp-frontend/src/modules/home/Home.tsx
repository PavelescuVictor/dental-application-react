import { withAccessControl } from 'hocs';
import { RouteAccessTypes } from 'routes/models';
import { Banner } from 'components';
import StyledHome from './Home.style';

const Home = (): JSX.Element => (
  <StyledHome>
    <Banner />
  </StyledHome>
);
export default withAccessControl(Home, RouteAccessTypes.ALL_ACCESS);
