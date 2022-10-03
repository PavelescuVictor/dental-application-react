import { withAccessControl } from 'hocs';
import { useEffect } from 'react';
import { RouteAccessTypes } from 'routes/models';
import { Banner } from 'components';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { useAppDispatch } from 'store/store';
import StyledHome from './Home.style';

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(alertManagerActions.resetAlert());
    dispatch(alertManagerActions.clearHideInterval());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledHome>
      <Banner />
    </StyledHome>
  );
};
export default withAccessControl(Home, RouteAccessTypes.ALL_ACCESS);
