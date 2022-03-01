export interface BaseButtonProps {
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export interface ButtonProps extends BaseButtonProps {
  children?: ReactChildren;
  action?: () => void;
}

export default {
  BaseButtonProps,
  ButtonProps,
  StyledButtonProps,
};
