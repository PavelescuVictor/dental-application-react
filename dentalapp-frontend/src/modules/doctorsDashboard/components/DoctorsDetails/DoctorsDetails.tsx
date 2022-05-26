import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getSelectedDoctorData,
  getSelectedDoctor,
} from 'store/slices/doctorManagerSlice/doctorManagerSelectors';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import { withAccessControl } from 'hocs';
import { RouteAccessTypes } from 'routes/models';
import { useAppDispatch } from 'store/store';
import { Doctor } from 'store/slices/doctorManagerSlice/models';
import { RootState } from 'store/models';
import StyledDoctorDetails from './DoctorsDetails.style';

const DoctorsDetails = () => {
  const dispatch = useAppDispatch();
  const doctorData = useSelector<RootState, Doctor>(getSelectedDoctorData);
  const selectedDoctorId = useSelector(getSelectedDoctor);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    if (selectedDoctorId) {
      const alert = {
        alertMessage: 'Loaded details successfully',
        alertType: AlertTypes.SUCCESS,
      };
      dispatch(alertManagerActions.setAlertData(alert));
      setShowDetails(true);
    } else {
      const alert = {
        alertMessage: 'No doctor selected',
        alertType: AlertTypes.WARNING,
      };
      dispatch(alertManagerActions.setAlertData(alert));
      setShowDetails(false);
    }
  }, []);

  return (
    <StyledDoctorDetails>
      {showDetails && (
        <div className="doctorDetails">
          <div className="content">
            <div className="card__wrapper">
              <div className="list__wrapper">
                <ul className="list__content">
                  <li>
                    <p>First Name</p>
                    <p>{doctorData.firstName}</p>
                  </li>
                  <li>
                    <p>Last Name</p>
                    <p>{doctorData.lastName}</p>
                  </li>
                  <li>
                    <p>Created At</p>
                    <p>{new Date(doctorData.createdAt).toLocaleString()}</p>
                  </li>
                  <li>
                    <p>Updated At</p>
                    <p>{new Date(doctorData.updatedAt).toLocaleString()}</p>
                  </li>
                  <li>
                    <p>Created By</p>
                    <p>{doctorData.createdBy}</p>
                  </li>
                  <li>
                    <p>Updated By</p>
                    <p>{doctorData.updatedBy}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </StyledDoctorDetails>
  );
};

export default withAccessControl(DoctorsDetails, RouteAccessTypes.ONLY_ADMINS);
