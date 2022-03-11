import { withAccessControl } from 'hocs';
import { RouteAccessTypes } from 'routes/models';
import StyledAdmin from './Admin.styles';

const Admin = (): JSX.Element => {
  return <StyledAdmin></StyledAdmin>;
};

export default withAccessControl(Admin, RouteAccessTypes.ONLY_ADMINS);
