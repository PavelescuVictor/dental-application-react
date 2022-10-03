import styled, { css } from 'styled-components';

const StyledNavbar = styled.div`
  ${(props) => {
    const {
      theme: { palette, typography },
    } = props;
    return css`
      height: 8vh;
      width: 100%;

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
          font-family: ${typography.font.secondary};
          font-weight: 400;
          font-size: 2em;
          cursor: pointer;
          line-height: 100%;
          color: ${palette.basic.white};
        }
      }
    `;
  }}
`;

StyledNavbar.displayName = 'StyledNavbar';

export default StyledNavbar;
