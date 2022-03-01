import { ButtonProps } from './models';
import StyledButton from './Button.style';

const Button = (props: ButtonProps): JSX.Element => {
  const { className, ariaLabel, action, children, disabled } = props;
  return (
    <StyledButton className={className} ariaLabel={ariaLabel} disabled={disabled} onClick={action}>
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
