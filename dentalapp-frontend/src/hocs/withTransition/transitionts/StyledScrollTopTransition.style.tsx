import styled, { css } from 'styled-components';

const StyledScrollTopTransition = styled.div`
  ${(props) => {
    const { theme: palette } = props;
    return css`
      .transition-wrapper {
        position: fixed;
        bottom: -50px;
        right: 20px;
        z-index: 100;
        height: fit-content;

        &.transition-start {
          animation: scroll-top-slidein 0.65s forwards, rotate 0.6s ease-in-out both;
        }

        &.transition-end {
          animation: scroll-top-slideout 0.65s forwards;
        }
      }

      @keyframes scroll-top-slidein {
        0% {
          bottom: -50px;
        }

        60% {
          bottom: 40px;
        }

        100% {
          bottom: 20px;
        }
      }

      @keyframes scroll-top-slideout {
        0% {
          bottom: 20px;
        }

        40% {
          bottom: 40px;
        }

        100% {
          bottom: -50px;
        }
      }
    `;
  }}
`;

StyledScrollTopTransition.displayName = 'StyledScrollTopTransition';

export default StyledScrollTopTransition;
