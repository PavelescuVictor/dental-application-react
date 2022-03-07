import svgAssets from 'assets/images';
import StyledLogo from './Logo.style';
import { LogoProps } from './models';

const { Logo: LogoSvg } = svgAssets;

const Logo = ({ hasAnimation }: LogoProps): JSX.Element => (
  <StyledLogo hasAnimation={hasAnimation}>
    <div className="main-logo">
      <LogoSvg />
    </div>
  </StyledLogo>
);
export default Logo;
