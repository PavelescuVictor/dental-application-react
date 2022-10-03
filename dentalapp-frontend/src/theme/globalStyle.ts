import { createGlobalStyle, css } from 'styled-components';
import palette from './palette';
import typography from './typography';
import 'assets/fonts/index.css';

export const SCROLLBAR_WEIGHT = '6px';

export const animations = {
  fadeIn: 'fadeIn',
  fadeOut: 'fadeOut',
  popIn: 'popIn',
  popOut: 'popOut',
  rotate: 'rotate',
  rotateReverse: 'rotateReverse',
  zoomIn: 'zoomIn',
};

export const coreGlobalStyle = css`
  html,
  body,
  #root {
    height: 100%;
    overscroll-behavior: none;
  }
  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${palette.gray.cod};
    box-sizing: border-box;
    color: ${palette.gray.alpha};
    font-family: ${typography.font.primary};
    margin: 0;
    padding: 0;

    &.no-overflow {
      overflow: hidden;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .App {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    height: 100%;
  }

  @supports (-webkit-overflow-scrolling: touch) {
    /* Fix on click outside functionality on iOS devices */
    body {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
  }

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    .ie11-fix {
      margin-top: 100px;
    }
  }

  * {
    box-sizing: border-box;
    outline: none;
    font-variant-ligatures: none;
  }

  input {
    font-family: ${typography.font.medium};
  }

  ::-webkit-scrollbar {
    width: ${SCROLLBAR_WEIGHT};
    height: ${SCROLLBAR_WEIGHT};
  }

  ::-webkit-scrollbar-track {
    background-color: #f4f4f400;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${palette.gray.bravo};
    border-radius: 4px;
    &:hover {
      background-color: ${palette.basic.gray};
    }
  }

  @keyframes ${animations.popIn} {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes ${animations.popOut} {
    from {
      opacity: 1;
      transform: translateY(0px);
    }
    to {
      opacity: 0;
      transform: translateY(15px);
    }
  }

  @keyframes ${animations.zoomIn} {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.2);
    }
  }

  @keyframes ${animations.fadeIn} {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes ${animations.fadeOut} {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes ${animations.rotate} {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes ${animations.rotateReverse} {
    100% {
      transform: rotate(-360deg);
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  ${coreGlobalStyle}
`;

export default GlobalStyle;
