import { PageProps } from './models';
import StyledPage from './Page.style';

const Page = ({ children, className, viewType }: PageProps): JSX.Element => (
  <StyledPage className={className} viewType={viewType}>
    {children}
  </StyledPage>
);

export default Page;
