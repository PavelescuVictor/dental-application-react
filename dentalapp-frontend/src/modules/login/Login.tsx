import { ChangeEvent, useState } from 'react';
import svgAssets from 'assets/images';
import { FormControl, TextField } from '@mui/material';
import StyledLogin from './Login.style';
import { common } from '@mui/material/colors';

const { Background } = svgAssets;

interface FormValues {
  email: string;
  password: string;
}

const defaultFormValues: FormValues = {
  email: '',
  password: '',
};

const Login = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);

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
    console.log(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO: Dispatch login
    // login({ email, password })
    //   .then(() => {
    //     if (this.isLoggedIn) {
    //       if (this.$route.params.nextUrl != null) {
    //         this.$router.push(this.$route.params.nextUrl);
    //       } else {
    //         this.$router.push('home');
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     this.alertMessage = err;
    //   });
  };

  const reset = () => {
    setFormValues(defaultFormValues);
  };

  return (
    <StyledLogin>
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
    </StyledLogin>
  );
};
export default Login;
