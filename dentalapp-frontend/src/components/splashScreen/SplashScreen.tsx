import { Image, Logo } from 'components';
import { Background } from 'assets/images';
import StyledSplashScreen from './SplashScreen.style';

const SplashScreen = (): JSX.Element => {
  console.log('splashScreen');
  return (
    <StyledSplashScreen>
      <Image className="background" alt="Background" imageUrl={Background} />
      <div className="overlay">
        <div className="overlay__top" />
        <div className="overlay__left" />
      </div>
      <Logo />
    </StyledSplashScreen>
  );
};

export default SplashScreen;
