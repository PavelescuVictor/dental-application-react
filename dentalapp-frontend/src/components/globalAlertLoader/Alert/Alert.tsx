import { AlertProps } from './models';
import StyledAlert from './Alert.style';

const Alert = (props: AlertProps): JSX.Element => (
  <StyledAlert className={props.className}>
    <p>{props.message}</p>
  </StyledAlert>
);

export default Alert;
