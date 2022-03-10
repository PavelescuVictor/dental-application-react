import { Page } from 'components';
import { ViewType } from 'components/page/models';
import StyledNotFoundPage from './notFoundPage.style';

const NotFoundPage = (): JSX.Element => (
  <StyledNotFoundPage>
    <Page viewType={ViewType.FULL_VIEWPORT}>
      <h1>Page not found. Try another one</h1>
    </Page>
  </StyledNotFoundPage>
);

export default NotFoundPage;
