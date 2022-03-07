import styled, { css } from 'styled-components';

const StyledSplashScreen = styled.div`
  ${(props) => {
    const {
      theme: { palette },
    } = props;

    return css`
      height: 100vh;
      animation: fadeOut 1s ease forwards 1.2s;

      .overlay {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 4;
      }

      .overlay__top {
        height: 100%;
        width: 100%;
        position: absolute;
        top: -100%;
        left: 0px;
        background-color: ${palette.secondary};
        animation: overlay__slide-down 0.7s ease forwards, overlay__fade-out 0.8s ease forwards;
        z-index: 5;
      }

      .overlay__left {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0px;
        left: -100%;
        background-color: ${palette.basic.white};
        animation: overlay__slide-right 0.8s ease-out forwards 0.4s;
        z-index: 5;
      }

      @keyframes overlay__slide-down {
        from {
          top: -100%;
        }
        to {
          top: 0%;
        }
      }

      @keyframes overlay__fade-out {
        0% {
          opacity: 100%;
        }
        75% {
          opacity: 100%;
        }
        100% {
          opacity: 0%;
        }
      }

      @keyframes overlay__slide-right {
        from {
          left: -100%;
        }
        to {
          left: 100%;
        }
      }
    `;
  }}
`;

StyledSplashScreen.displayName = 'StyledSplashScreen';

export default StyledSplashScreen;
