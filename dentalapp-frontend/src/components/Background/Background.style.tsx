import styled, { css } from 'styled-components';

const StyledBackground = styled.div`
  ${() =>
    css`
      width: 100%;
      min-height: 100%;
      overflow: hidden;
      position: fixed;
      transform: scale(1.3);
      transform-origin: top left;

      svg {
        min-height: 100vh;
      }
    `}
`;

StyledBackground.displayName = 'StyledBackground';

export default StyledBackground;
