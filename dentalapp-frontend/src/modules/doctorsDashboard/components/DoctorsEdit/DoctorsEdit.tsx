/* eslint-disable max-lines-per-function */
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/store';
import { useState, useEffect } from 'react';
import { Box, Input, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { ConfirmationDialog, Button } from 'components';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import { ALERT_DEFAULT_TIME } from 'store/slices/alertManagerSlice/constants';
import { withAccessControl } from 'hocs';
import { RouteAccessTypes } from 'routes/models';
import {
  doctorManagerActions,
  doctorManagerAsyncThunk,
} from 'store/slices/doctorManagerSlice/doctorManager';
import {
  getSelectedDoctor,
  getDoctorDetails,
  getDoctorInfo,
} from 'store/slices/doctorManagerSlice/doctorManagerSelectors';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { DoctorsDashboardTabs } from 'modules/doctorsDashboard/models';
import StyledDoctorsEdit from './DoctorsEdit.style';

interface FormValues {
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  cabinet: string | undefined | null;
  phone: string | undefined | null;
}

const defaultFormValues: FormValues = {
  firstName: '',
  lastName: '',
  cabinet: '',
  phone: '',
};

type ValidationRulesType<Type> = {
  [Property in keyof Type]: (value: any) => string | boolean;
};

const validationRules: ValidationRulesType<FormValues> = {
  firstName: (value: string): string => {
    if (value === '') return 'First name is required';
    // if (!/^([^0-9]*)$/.test(value)) return 'Must not contain numbers';
    return '';
  },
  lastName: (value: string): string => {
    if (value === '') return 'Last name is required';
    return '';
  },
  cabinet: (value: string): string => {
    if (value === '') return 'Cabinet is required';
    return '';
  },
  phone: (value: string): string => {
    if (value === null) return 'Phone is required';
    return '';
  },
};

const DoctorsEdit = () => {
  const dispatch = useAppDispatch();
  const doctorDetails = useSelector(getDoctorDetails);
  const doctorInfo = useSelector(getDoctorInfo);
  const selectedDoctorId = useSelector(getSelectedDoctor);
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [errors, setError] = useState<FormValues>({
    firstName: defaultFormValues.firstName,
    lastName: defaultFormValues.lastName,
    cabinet: defaultFormValues.cabinet,
    phone: defaultFormValues.phone,
  });
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleRequestSelectedDoctorDetails = async () => {
    await dispatch(doctorManagerAsyncThunk.requestSelectedDoctorDetails({ id: selectedDoctorId }));
    await dispatch(doctorManagerAsyncThunk.requestSelectedDoctorInfo({ id: selectedDoctorId }));
    const alert = {
      alertMessage: 'Loaded details successfully',
      alertType: AlertTypes.SUCCESS,
    };
    dispatch(alertManagerActions.clearHideInterval());
    dispatch(alertManagerActions.setAlertData(alert));
    dispatch(
      alertManagerActions.setHideInterval({
        hideIntervalId: setTimeout(() => {
          dispatch(alertManagerActions.resetAlert());
        }, ALERT_DEFAULT_TIME),
      })
    );
    setShowDetails(true);
  };

  useEffect(() => {
    if (showDetails) {
      setFormValues({
        firstName: doctorDetails?.firstName,
        lastName: doctorDetails?.lastName,
        cabinet: doctorInfo?.cabinet,
        phone: doctorInfo?.phone,
      });
      setShowDetails(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDetails]);

  useEffect(() => {
    if (selectedDoctorId) {
      try {
        handleRequestSelectedDoctorDetails();
      } catch {
        setFormValues(defaultFormValues);
        const alert = {
          alertMessage: 'There was an error loading details for the selected doctor!',
          alertType: AlertTypes.ERROR,
        };
        dispatch(alertManagerActions.clearHideInterval());
        dispatch(alertManagerActions.setAlertData(alert));
        dispatch(
          alertManagerActions.setHideInterval({
            hideIntervalId: setTimeout(() => {
              dispatch(alertManagerActions.resetAlert());
            }, ALERT_DEFAULT_TIME),
          })
        );
        setShowDetails(false);
      }
    } else {
      setFormValues(defaultFormValues);
      const alert = {
        alertMessage: 'No doctor selected',
        alertType: AlertTypes.WARNING,
      };
      dispatch(alertManagerActions.clearHideInterval());
      dispatch(alertManagerActions.setAlertData(alert));
      dispatch(
        alertManagerActions.setHideInterval({
          hideIntervalId: setTimeout(() => {
            dispatch(alertManagerActions.resetAlert());
          }, ALERT_DEFAULT_TIME),
        })
      );
      setShowDetails(false);
    }
  }, []);

  const checkIsValid = () => {
    const validationResult: any = Object.entries(formValues).reduce((acc, [key, value]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const errorMessage = validationRules[key](value);

      if (!errorMessage) return acc;

      return {
        ...acc,
        [key]: errorMessage,
      };
    }, {});

    if (Object.keys(validationResult).length > 0) {
      setError(validationResult);
      return false;
    }

    return true;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setError((errorState) => ({
      ...errorState,
      [name]: '',
    }));

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!checkIsValid()) return;
    try {
      await dispatch(
        doctorManagerAsyncThunk.editDoctorDetails({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          id: selectedDoctorId,
        })
      ).unwrap();
      await dispatch(
        doctorManagerAsyncThunk.editDoctorInfo({
          cabinet: formValues.cabinet,
          phone: formValues.phone,
          id: selectedDoctorId,
        })
      );
      const alert = {
        alertMessage: 'Edited doctor successfully',
        alertType: AlertTypes.SUCCESS,
      };
      dispatch(alertManagerActions.setAlertData(alert));
      dispatch(doctorManagerActions.setSelectedDashboardTab(DoctorsDashboardTabs.LIST));
    } catch (rejectedValueOrSerializedError) {
      const alert = {
        alertMessage: 'Edited doctor unsuccessfully',
        alertType: AlertTypes.ERROR,
      };
      dispatch(alertManagerActions.setAlertData(alert));
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    setFormValues({
      firstName: doctorDetails?.firstName,
      lastName: doctorDetails?.lastName,
      cabinet: doctorInfo ? doctorInfo.cabinet : defaultFormValues.cabinet,
      phone: doctorInfo ? doctorInfo.phone : defaultFormValues.phone,
    });
  };

  return (
    <StyledDoctorsEdit>
      {showDetails && (
        <div className="form__wrapper">
          <Box component="form" onReset={handleReset} onSubmit={handleSubmit}>
            <FormControl variant="standard" error={!!errors?.firstName}>
              <InputLabel htmlFor="fist-name-input" className="form-labels">
                First Name
              </InputLabel>
              <Input
                id="first-name-input"
                type="text"
                value={formValues.firstName}
                onChange={handleInputChange}
                autoComplete="first-name"
                name="firstName"
                fullWidth
                autoFocus
              />
              <FormHelperText className="form-error-text"> {errors?.firstName} </FormHelperText>
            </FormControl>

            <FormControl variant="standard" error={!!errors?.lastName}>
              <InputLabel htmlFor="last-name-input" className="form-labels">
                Last Name
              </InputLabel>
              <Input
                id="last-name-input"
                type="text"
                value={formValues.lastName}
                onChange={handleInputChange}
                autoComplete="last-name"
                name="lastName"
                fullWidth
              />
              <FormHelperText className="form-error-text"> {errors?.lastName} </FormHelperText>
            </FormControl>

            <FormControl variant="standard" error={!!errors?.cabinet}>
              <InputLabel htmlFor="cabinet-input" className="form-labels">
                Cabinet
              </InputLabel>
              <Input
                id="cabinet-input"
                type="text"
                value={formValues.cabinet}
                onChange={handleInputChange}
                autoComplete="cabinet"
                name="cabinet"
                fullWidth
                disabled={!doctorInfo}
              />
              <FormHelperText className="form-error-text"> {errors?.lastName} </FormHelperText>
            </FormControl>

            <FormControl variant="standard" error={!!errors?.phone}>
              <InputLabel htmlFor="phone-input" className="form-labels">
                Phone
              </InputLabel>
              <Input
                id="phone-input"
                type="text"
                value={formValues.phone}
                onChange={handleInputChange}
                autoComplete="phone"
                name="phone"
                fullWidth
                disabled={!doctorInfo}
              />
              <FormHelperText className="form-error-text"> {errors?.lastName} </FormHelperText>
            </FormControl>

            <div className="form__buttons">
              <Button
                type="submit"
                className="add-button"
                action={() => handleSubmit}
                disabled={Object.keys(errors).some((key) => errors[key as keyof FormValues] !== '')}
              >
                Submit
              </Button>
              <Button className="reset-button" action={handleReset} type="reset">
                Reset
              </Button>
            </div>
            <ConfirmationDialog
              title="Add Confirmation"
              body="Are you sure you want to add a doctor"
              confirmLabel="Confirm"
              onConfirm={handleSubmit}
            />
          </Box>
        </div>
      )}
    </StyledDoctorsEdit>
  );
};

export default withAccessControl(DoctorsEdit, RouteAccessTypes.ONLY_ADMINS);
