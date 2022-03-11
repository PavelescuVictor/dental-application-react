import { withAccessControl } from 'hocs';
import { RouteAccessTypes } from 'routes/models';
import StyleOrders from './Orders.style';

const Orders = (): JSX.Element => {
  return <StyleOrders></StyleOrders>;
};

export default withAccessControl(Orders, RouteAccessTypes.ONLY_AUTHENTICATED);
