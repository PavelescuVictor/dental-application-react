import { ReactNode, ReactChild } from 'react';
import StyledLink from './Link.style';

interface LinkProps {
  className?: string;
  children: ReactNode | ReactChild;
  to: string;
  onClick?: () => void;
}

const Link = ({ className, children, to, onClick }: LinkProps): JSX.Element => (
  <StyledLink className={className} to={to} onClick={onClick}>
    {children}
  </StyledLink>
);

export default Link;
