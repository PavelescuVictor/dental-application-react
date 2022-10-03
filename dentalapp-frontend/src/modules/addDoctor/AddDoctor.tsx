import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Typography, Box, Input, FormControl, InputLabel, FormHelperText } from '@mui/material';
import svgAssets from 'assets/images';
import { Page, ConfirmationDialog, Button } from 'components';
import { ViewType } from 'components/Page/models';
import { useAppDispatch } from 'store/store';
import { doctorManagerAsyncThunk } from 'store/slices/doctorManagerSlice/doctorManager';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { ALERT_DEFAULT_TIME } from 'store/slices/alertManagerSlice/constants';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import { withAccessControl } from 'hocs';
import { routePaths, RouteAccessTypes } from 'routes/models';
import StyledAddDoctor from './AddDoctor.style';

const { Background } = svgAssets;

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

const AddDoctor = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [errors, setError] = useState<FormValues>({
    firstName: '',
    lastName: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(alertManagerActions.resetAlert());
    dispatch(alertManagerActions.clearHideInterval());
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
      await dispatch(doctorManagerAsyncThunk.addDoctor(formValues)).unwrap();
      const alert = {
        alertMessage: 'Added doctor successfully',
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
      navigate(routePaths.DOCTORS);
    } catch (rejectedValueOrSerializedError) {
      const alert = {
        alertMessage: 'Added doctor unsuccessfully',
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
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    setFormValues(defaultFormValues);
  };

  return (
    <StyledAddDoctor>
      <Page viewType={ViewType.RIGHT_SIDE_CONTENT}>
        <div className="content">
          <div className="content__banner">
            <div className="banner__overlay">
              <div className="overlay__image">
                <Background />
              </div>
            </div>
          </div>
          <div className="content__form">
            <div className="form__wrapper">
              <Typography component="p" className="form-title">
                Add doctor
              </Typography>
              <Box component="form" onSubmit={handleSubmit} onReset={handleReset}>
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
                    disabled={Object.keys(errors).some(
                      (key) => errors[key as keyof FormValues] !== ''
                    )}
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
          </div>
        </div>
      </Page>
    </StyledAddDoctor>
  );
};

export default withAccessControl(AddDoctor, RouteAccessTypes.ONLY_ADMINS);
