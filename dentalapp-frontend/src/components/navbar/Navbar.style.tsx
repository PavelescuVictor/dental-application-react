import styled, { css } from 'styled-components';

const StyledNavbar = styled.div`
  ${(props) => {
    const {
      theme: { palette, typography },
    } = props;
    return css`
      height: 8vh;
      width: 100%;
      position: fixed;
      top: 0px;
      left: 0px;
      z-index: 100;

      .navbar__content {
        height: 100%;
        width: 90%;
        margin: auto;
        display: flex;
      }

      .content__logo {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        h4 {
          font-family: ${typography.primary};
          font-weight: 400;
          font-size: 2em;
          cursor: pointer;
          line-height: 100%;
        }
      }
    `;
  }}
`;

StyledNavbar.displayName = 'StyledNavbar';

export default StyledNavbar;
