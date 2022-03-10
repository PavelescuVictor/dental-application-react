import StyledPage from './Page.style';
import { PageProps } from './models';

const Page = ({ children, className, viewType }: PageProps): JSX.Element => (
  <StyledPage className={className} viewType={viewType}>
    {children}
  </StyledPage>
);

export default Page;
