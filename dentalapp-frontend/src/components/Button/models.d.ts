import { AnyIfEmpty } from 'react-redux';

export interface BaseButtonProps {
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface ButtonProps extends BaseButtonProps {
  children?: ReactChildren;
  action?: (event: AnyIfEmpty) => void;
}

export default {
  BaseButtonProps,
  ButtonProps,
  StyledButtonProps,
};
