import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/store';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Box, Input, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { ConfirmationDialog, Button } from 'components';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import { withAccessControl } from 'hocs';
import { routePaths, RouteAccessTypes } from 'routes/models';
import { doctorManagerAsyncThunk } from 'store/slices/doctorManagerSlice/doctorManager';
import {
  getDoctorDetails,
  getSelectedDoctor,
} from 'store/slices/doctorManagerSlice/doctorManagerSelectors';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import StyledOrdersEdit from './OrdersEdit.style';

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
    if (!/^([^0-9]*)$/.test(value)) return 'Must not contain numbers';
    return '';
  },
  lastName: (value: string): string => {
    if (value === '') return 'Last name is required';
    return '';
  },
};

const OrdersEdit = () => {
  const dispatch = useAppDispatch();
  const doctorData = useSelector(getDoctorDetails);
  const selectedDoctorId = useSelector(getSelectedDoctor);
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [errors, setError] = useState<FormValues>({
    firstName: '',
    lastName: '',
  });

  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    if (selectedDoctorId) {
      const alert = {
        alertMessage: 'Loaded details successfully',
        alertType: AlertTypes.SUCCESS,
      };
      dispatch(alertManagerActions.setAlertData(alert));
      setFormValues({ firstName: doctorData?.firstName, lastName: doctorData?.lastName });
      setShowDetails(true);
    } else {
      const alert = {
        alertMessage: 'No order selected',
        alertType: AlertTypes.WARNING,
      };
      dispatch(alertManagerActions.setAlertData(alert));
      setFormValues(defaultFormValues);
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
      await dispatch(doctorManagerAsyncThunk.editDoctor(formValues)).unwrap();
      const alert = {
        alertMessage: 'Edited order successfully',
        alertType: AlertTypes.SUCCESS,
      };
      dispatch(alertManagerActions.setAlertData(alert));
      navigate(routePaths.DOCTORS);
    } catch (rejectedValueOrSerializedError) {
      const alert = {
        alertMessage: 'Edited order unsuccessfully',
        alertType: AlertTypes.ERROR,
      };
      dispatch(alertManagerActions.setAlertData(alert));
    }
  };

  const handleReset = () => {
    setFormValues({ firstName: doctorData?.firstName, lastName: doctorData?.lastName });
  };

  return (
    <StyledOrdersEdit>
      {showDetails && (
        <div className="form__wrapper">
          <Box
            component="form"
            onSubmit={(event: any) => {
              event?.preventDefault();
              if (!checkIsValid()) return;
              setIsDialogOpen(true);
            }}
            onReset={handleReset}
          >
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
                Add
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
    </StyledOrdersEdit>
  );
};

export default withAccessControl(OrdersEdit, RouteAccessTypes.ONLY_ADMINS);
