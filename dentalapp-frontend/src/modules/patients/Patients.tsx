import { withAccessControl } from 'hocs';
import { RouteAccessTypes } from 'routes/models';
import StyledPatients from './Patients.style';

const Patients = (): JSX.Element => {
  return <StyledPatients></StyledPatients>;
};

export default withAccessControl(Patients, RouteAccessTypes.ONLY_AUTHENTICATED);
