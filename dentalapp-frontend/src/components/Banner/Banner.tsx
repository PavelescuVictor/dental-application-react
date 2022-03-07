import svgAssets from 'assets/images';
import { Button, Logo } from 'components';
import StyledBanner from './Banner.style';

const { Background, Main, TopLeftLeaves, TopRightLeaves, Girl, Guy } = svgAssets;

const Banner = (): JSX.Element => (
  <StyledBanner>
    <div className="background">
      <Background />
    </div>
    <div className="gradient gradient--left" />
    <div className="gradient gradient--right" />

    <div className="banner__content">
      <div className="content__main">
        <Logo />

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi nemo, debitis amet laborum
          nam corrupti.
        </p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nam!</p>

        <Button className="banner__learn-more">
          <a href="https://www.google.com">Learn More</a>
        </Button>
      </div>

      <Main className="main" />
      <TopLeftLeaves className="top-left-leaves" />
      <TopRightLeaves className="top-right-leaves" />
      <Girl className="girl" />
      <Guy className="guy" />
    </div>
  </StyledBanner>
);

export default Banner;
