import { Image, Logo } from 'components';
import svgAssets from 'assets/images';
import StyledSplashScreen from './SplashScreen.style';

const { Background } = svgAssets;

const SplashScreen = (): JSX.Element => (
  <StyledSplashScreen>
    <Image className="background" alt="Background" imageUrl={Background} />
    <div className="overlay">
      <div className="overlay__top" />
      <div className="overlay__left" />
    </div>
    <Logo />
  </StyledSplashScreen>
);

export default SplashScreen;
