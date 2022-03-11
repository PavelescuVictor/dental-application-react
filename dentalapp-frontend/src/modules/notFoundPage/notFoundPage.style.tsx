import styled, { css } from 'styled-components';

const StyledNotFoundPage = styled.div`
  ${() => css`
    min-height: 100vh;
    position: relative;

    .background {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: absolute;
      z-index: -1;

      svg {
        width: 100%;
      }
    }

    .not-found-page {
      height: 100vh;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;

      h1 {
        font-size: 2rem;
      }
    }
  `}
`;

StyledNotFoundPage.displayName = 'StyledNotFoundPage';

export default StyledNotFoundPage;
