import StyledNoDataAvailable from './NoDataAvailable.style';

interface NoDataAvailableProps {
  className?: string;
  message: string;
}

const NoDataAvailable = (props: NoDataAvailableProps): JSX.Element => (
  <StyledNoDataAvailable className={props.className}>
    <p>{props.message}</p>
  </StyledNoDataAvailable>
);

export default NoDataAvailable;
