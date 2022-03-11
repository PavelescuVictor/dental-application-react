import { ChangeEvent, useState } from 'react';
import { FormControl, TextField } from '@mui/material';
import svgAssets from 'assets/images';
import { Page } from 'components';
import { ViewType } from 'components/page/models';
import { useAppDispatch } from 'store/store';
import { userManagerAsyncThunks } from 'store/slices/userManagerSlice/userManager';
import useUnwrapAsyncThunk from 'hooks/useUnwrapAsyncThunk';
import { useNavigate } from 'react-router';
import { withAccessControl } from 'hocs';
import { routePaths, RouteAccessTypes } from 'routes/models';
import StyledLoginPage from './LoginPage.style';

const { Background } = svgAssets;

interface FormValues {
  email: string;
  password: string;
}

const defaultFormValues: FormValues = {
  email: '',
  password: '',
};

const LoginPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const unwrapDispatch = useUnwrapAsyncThunk();
  const [isValid, setIsValid] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const navigate = useNavigate();

  const validationRules = {
    common: [(value) => !!value || 'Required'],
    email: [
      (value) => !!value || 'Email is required',
      (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
    ],
    password: [(value) => !!value || 'Password is required'],
  };

  const checkIsValid = (name: string, value: string) => {
    return true;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (!checkIsValid(name, value)) return;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const originalData = await dispatch(userManagerAsyncThunks.login(formValues)).unwrap();
      navigate(routePaths.HOME);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  const reset = () => {
    setFormValues(defaultFormValues);
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
              <p>Login into the application</p>
              <FormControl className="form">
                <TextField
                  id="email-input"
                  name="email"
                  label="Enter email"
                  type="text"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                <TextField
                  id="email-input"
                  name="password"
                  label="Enter password"
                  type="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <div className="form__buttons">
                <button type="submit" disabled={!isValid} onClick={handleSubmit}>
                  Submit
                </button>
                <button type="reset" onClick={reset}>
                  Reset Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </StyledLoginPage>
  );
};
export default withAccessControl(LoginPage, RouteAccessTypes.ALL_ACCESS);
