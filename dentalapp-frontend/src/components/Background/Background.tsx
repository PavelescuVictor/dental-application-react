import svgAssets from 'assets/images';
import StyledBackground from './Background.style';
import { BackgroundProps } from './models';

const { Background: BackgroundSvg } = svgAssets;

const Background = (props: BackgroundProps): JSX.Element => (
  <StyledBackground>
    <BackgroundSvg />
  </StyledBackground>
);

export default Background;
