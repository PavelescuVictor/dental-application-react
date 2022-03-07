import styled, { css } from 'styled-components';
import { LogoProps } from './models';

const StyledLogo = styled.div<LogoProps>`
  ${(props) => {
    const {
      theme: { palette },
      hasAnimation,
    } = props;
    return css`
      height: 100%;
      width: 100%;
      margin: auto;

      .main-logo {
        animation: logo__slide-forward 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both 2.2s,
          logo__color-change 0.9s ease-in-out forwards 0.55s, logo__fill 0.5s ease forwards 2.2s;

        path:nth-child(1) {
          stroke-width: 1000px;
          stroke-dasharray: 752.4971313476562px;
          stroke-dashoffset: 752.4971313476562px;
          animation: logo__dash-offset 1.5s ease forwards,
            logo__stroke-change 0.9s ease-in-out forwards 0.55s;
        }
      }

      .main-logo path:nth-child(2) {
        stroke-dasharray: 622.1158447265625px;
        stroke-dashoffset: 622.1158447265625px;
        animation: logo__dash-offset 1.5s ease forwards 0.15s,
          logo__stroke-change 0.9s ease-in-out forwards 0.55s;
      }

      .main-logo path:nth-child(3) {
        stroke-dasharray: 497.4835510253906px;
        stroke-dashoffset: 497.4835510253906px;
        animation: logo__dash-offset 1.5s ease forwards 0.3s,
          logo__stroke-change 0.9s ease-in-out forwards 0.55s;
      }

      .main-logo path:nth-child(4) {
        stroke-dasharray: 864.15185546875px;
        stroke-dashoffset: 864.15185546875px;
        animation: logo__dash-offset 1.5s ease forwards 0.45s,
          logo__stroke-change 0.9s ease-in-out forwards 0.55s;
      }

      .main-logo path:nth-child(5) {
        stroke-dasharray: 752.49755859375px;
        stroke-dashoffset: 752.49755859375px;
        animation: logo__dash-offset 1.5s ease forwards 0.6s,
          logo__stroke-change 0.9s ease-in-out forwards 0.55s;
      }

      .main-logo path:nth-child(6) {
        stroke-dasharray: 718.4203491210938px;
        stroke-dashoffset: 718.4203491210938px;
        animation: logo__dash-offset 1.5s ease forwards 0.75s,
          logo__stroke-change 0.9s ease-in-out forwards 0.55s;
      }

      .main-logo path:nth-child(7) {
        stroke-dasharray: 534.0693359375px;
        stroke-dashoffset: 534.0693359375px;
        animation: logo__dash-offset 1.5s ease forwards 0.9s,
          logo__stroke-change0.9s ease-in-out forwards 0.55s;
      }

      /* @keyframes logo__dash-offset {
        to {
          stroke-dashoffset: 0;
        }
      } */

      @keyframes logo__fill {
        from {
          fill: transparent;
        }
        to {
          fill: ${palette.basic.white};
        }
      }
      /* 
      @keyframes logo__slide-forward {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.08);
        }
        100% {
          transform: scale(1);
        }
      } */

      @keyframes logo__color-change {
        0% {
          fill: ${palette.basic.white};
          stroke: ${palette.basic.white};
        }
        50% {
          fill: ${palette.secondary};
          stroke: ${palette.secondary};
        }
        100% {
          fill: transparent;
          stroke: ${palette.basic.white};
        }
      }

      /* @keyframes logo__stroke-change {
        0% {
          stroke: ${palette.basic.white};
        }
        50% {
          stroke: ${palette.secondary};
        }
        100% {
          stroke: ${palette.basic.white};
        }
      } */
    `;
  }}
`;

StyledLogo.displayName = 'StyledLogo';

export default StyledLogo;
