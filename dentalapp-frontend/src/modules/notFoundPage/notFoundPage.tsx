import { withAccessControl } from 'hocs';
import { RouteAccessTypes } from 'routes/models';
import svgAssets from 'assets/images';
import StyledNotFoundPage from './notFoundPage.style';

const { Background } = svgAssets;

const NotFoundPage = (): JSX.Element => (
  <StyledNotFoundPage>
    <div className="not-found-page">
      <div className="background">
        <Background />
      </div>
      <h1>Page not found. Try another one</h1>
    </div>
  </StyledNotFoundPage>
);

export default withAccessControl(NotFoundPage, RouteAccessTypes.ALL_ACCESS);
