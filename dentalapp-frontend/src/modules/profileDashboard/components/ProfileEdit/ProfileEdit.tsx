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
  profileManagerActions,
  profileManagerAsyncThunk,
} from 'store/slices/profileManagerSlice/profileManager';
import { getProfileDetails } from 'store/slices/profileManagerSlice/profileManagerSelectors';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { ProfileDashboardTabs } from 'modules/profileDashboard/models';
import StyledProfileEdit from './ProfileEdit.style';

interface FormValues {
  firstName: string | undefined | null;
  lastName: string | undefined | null;
}

const defaultFormValues: FormValues = {
  firstName: '',
  lastName: '',
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
};

const ProfileEdit = () => {
  const dispatch = useAppDispatch();
  const profileDetails = useSelector(getProfileDetails);
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [errors, setError] = useState<FormValues>({
    firstName: defaultFormValues.firstName,
    lastName: defaultFormValues.lastName,
  });
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleRequestProfileDetails = async () => {
    await dispatch(profileManagerAsyncThunk.requestProfileDetails());
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
        firstName: profileDetails?.firstName,
        lastName: profileDetails?.lastName,
      });
      setShowDetails(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDetails]);

  useEffect(() => {
    try {
      handleRequestProfileDetails();
    } catch {
      setFormValues(defaultFormValues);
      const alert = {
        alertMessage: 'There was an error loading details for the profile!',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        profileManagerAsyncThunk.editProfileDetails({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
        })
      ).unwrap();
      const alert = {
        alertMessage: 'Edited profile successfully',
        alertType: AlertTypes.SUCCESS,
      };
      dispatch(alertManagerActions.setAlertData(alert));
      dispatch(profileManagerActions.setSelectedDashboardTab(ProfileDashboardTabs.DETAILS));
    } catch (rejectedValueOrSerializedError) {
      const alert = {
        alertMessage: 'Edited profile unsuccessfully',
        alertType: AlertTypes.ERROR,
      };
      dispatch(alertManagerActions.setAlertData(alert));
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    setFormValues({
      firstName: profileDetails?.firstName,
      lastName: profileDetails?.lastName,
    });
  };

  return (
    <StyledProfileEdit>
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
              body="Are you sure you want to add a profile"
              confirmLabel="Confirm"
              onConfirm={handleSubmit}
            />
          </Box>
        </div>
      )}
    </StyledProfileEdit>
  );
};

export default withAccessControl(ProfileEdit, RouteAccessTypes.ONLY_ADMINS);
