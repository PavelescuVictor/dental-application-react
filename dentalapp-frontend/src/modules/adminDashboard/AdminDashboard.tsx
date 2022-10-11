import { withAccessControl } from 'hocs';
import { RouteAccessTypes } from 'routes/models';
import StyledAdminDashboard from './AdminDashboard.styles';

const Admin = (): JSX.Element => <StyledAdminDashboard />;
export default withAccessControl(Admin, RouteAccessTypes.ONLY_ADMINS);
