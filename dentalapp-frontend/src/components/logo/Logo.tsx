import svgAssets from 'assets/images';
import StyledLogo from './Logo.style';
import { LogoProps } from './models';

const { Logo: LogoSvg } = svgAssets;

const Logo = ({ hasAnimation, className }: LogoProps): JSX.Element => (
  <StyledLogo hasAnimation={hasAnimation} className={className}>
    <LogoSvg className="main-logo" />
  </StyledLogo>
);
export default Logo;
