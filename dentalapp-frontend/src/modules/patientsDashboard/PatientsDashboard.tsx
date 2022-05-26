import { withAccessControl } from 'hocs';
import { RouteAccessTypes } from 'routes/models';
import StyledPatientsDashboard from './PatientsDashboard.style';

const PatientsDashboard = (): JSX.Element => {
  console.log('Patients Dashboard');
  return <StyledPatientsDashboard>empty</StyledPatientsDashboard>;
};

export default withAccessControl(PatientsDashboard, RouteAccessTypes.ONLY_ADMINS);
