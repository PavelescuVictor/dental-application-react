import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Typography,
  Box,
  Button,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import svgAssets from 'assets/images';
import { Page } from 'components';
import { ViewType } from 'components/Page/models';
import { useAppDispatch } from 'store/store';
import { userManagerAsyncThunks } from 'store/slices/userManagerSlice/userManager';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import { withAccessControl } from 'hocs';
import { routePaths, RouteAccessTypes } from 'routes/models';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import StyledLoginPage from './LoginPage.style';

const { Background } = svgAssets;

interface FormValues {
  email: string | undefined | null;
  password: string | undefined | null;
}

const defaultFormValues: FormValues = {
  email: '',
  password: '',
};

type ValidationRulesType<Type> = {
  [Property in keyof Type]: (value: any) => string | boolean;
};

const validationRules: ValidationRulesType<FormValues> = {
  email: (value: string): string => {
    if (value === '') return 'Email is required';
    if (!/.+@.+\..+/.test(value)) return 'E-mail must be valid';
    return '';
  },
  password: (value: string): string => {
    if (value === '') return 'Password is required';
    return '';
  },
};

const LoginPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setError] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

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
      await dispatch(userManagerAsyncThunks.login(formValues)).unwrap();
      const alert = {
        alertMessage: 'Logged in successfully',
        alertType: AlertTypes.SUCCESS,
      };
      dispatch(alertManagerActions.setAlertData(alert));
      navigate(routePaths.HOME);
    } catch (rejectedValueOrSerializedError) {
      const alert = {
        alertMessage: 'Logging in unsuccessfully',
        alertType: AlertTypes.ERROR,
      };
      dispatch(alertManagerActions.setAlertData(alert));
    }
  };

  const handleReset = () => {
    setFormValues(defaultFormValues);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <StyledLoginPage>
      <Page viewType={ViewType.RIGHT_SIDE_CONTENT}>
        <div className="login__content">
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
                Login into the application
              </Typography>
              <Box component="form" onSubmit={handleSubmit} onReset={handleReset}>
                <FormControl variant="standard" error={!!errors?.email}>
                  <InputLabel htmlFor="email-input" className="form-labels">
                    Email Address
                  </InputLabel>
                  <Input
                    id="email-input"
                    type="text"
                    value={formValues.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    name="email"
                    fullWidth
                    autoFocus
                  />
                  <FormHelperText className="form-error-text"> {errors?.email} </FormHelperText>
                </FormControl>

                <FormControl variant="standard" error={!!errors?.password}>
                  <InputLabel htmlFor="password-input" className="form-labels">
                    Password
                  </InputLabel>
                  <Input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={formValues.password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                    name="password"
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText className="form-error-text"> {errors?.password} </FormHelperText>
                </FormControl>

                <div className="form__buttons">
                  <Button
                    className="submit-button"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={Object.keys(errors).some(
                      (key) => errors[key as keyof FormValues] !== ''
                    )}
                  >
                    Login
                  </Button>
                  <Button
                    className="reset-button"
                    type="reset"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Reset
                  </Button>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </Page>
    </StyledLoginPage>
  );
};

export default withAccessControl(LoginPage, RouteAccessTypes.ALL_ACCESS);
