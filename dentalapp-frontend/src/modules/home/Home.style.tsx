import styled, { css } from 'styled-components';

const StyledHome = styled.div`
  ${() => css`
    min-height: 100vh;
  `}
`;

StyledHome.displayName = 'StyledHome';

export default StyledHome;
