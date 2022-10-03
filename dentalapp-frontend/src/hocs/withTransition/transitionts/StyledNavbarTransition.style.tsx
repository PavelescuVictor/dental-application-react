import styled, { css } from 'styled-components';

const StyledNavbarTransition = styled.div`
  ${(props) => {
    const { theme: palette } = props;
    return css`
      .transition-wrapper {
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 100;
        width: 100%;

        &.transition-start {
          animation: navbar-slidein 0.2s forwards;
        }

        &.transition-end {
          animation: navbar-slideout 0.2s forwards;
        }
      }

      @keyframes navbar-slidein {
        0% {
          top: -8vh;
        }

        100% {
          top: 0vh;
        }
      }

      @keyframes navbar-slideout {
        0% {
          top: 0vh;
        }

        100% {
          top: -8vh;
        }
      }
    `;
  }}
`;

StyledNavbarTransition.displayName = 'StyledNavbarTransition';

export default StyledNavbarTransition;
