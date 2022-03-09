import axios from 'axios';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useAppDispatch } from 'store/store';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'store/slices/userManagerSlice/userManagerSelectors';
import { useEffect } from 'react';

export function jwtInterceptor() {
  axios.interceptors.request.use((request) => {
    // add auth header with jwt if account is logged in and request is to the api url
    const account = accountService.accountValue;
    const isLoggedIn = account?.token;
    const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_URL);

    if (isLoggedIn && isApiUrl) {
      request.headers.common.Authorization = `Bearer ${account.token}`;
    }

    return request;
  });
}

const AuthInterceptor = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const checkAuthentication = () => {};

  //   useEffect(() => {
  //     if (!isLoggedIn) navigate('/login');
  //   }, [isLoggedIn]);
  return <></>;
};

export default AuthInterceptor;
