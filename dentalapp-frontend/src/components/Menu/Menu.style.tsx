import styled, { css } from 'styled-components';

const StyledMenu = styled.div`
  ${(props) => {
    const {
      theme: { palette, typography },
    } = props;
    return css`
      height: 100%;
      margin-left: auto;
      display: flex;
      justify-content: center;
      align-items: center;

      .menu__content {
        display: flex;

        li {
          list-style-type: none;
          padding: 10px;
          transition: box-shadow 0.2s ease-out, border-radius 0.2s ease-in, margin 0.1s ease-in;

          &:hover {
            box-shadow: 0px 5px 0px 0px ${palette.basic.white};
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            margin: 0px 6px;
          }

          a {
            font-size: 1.2rem;
            font-family: ${typography.font.secondary};
            letter-spacing: 0.05em;
            color: ${palette.basic.white};
          }
        }
      }

      .menu__content--block {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        li {
          position: relative;
          list-style-type: none;
          padding: 15px;
          transition: padding-top 0.2s ease-in, padding-bottom 0.2s ease-in,
            box-shadow 0.2s ease-out, background 0s ease-in, border-radius 0.2s ease-in,
            margin 0.1s ease-in;

          a {
            font-size: 1.1em;
            font-family: ${typography.primary};
            font-weight: bold;
            letter-spacing: 0.05em;
            color: ${palette.basic.white};
          }
        }

        li:hover {
          background: ${palette.basic.white};
          padding-top: 20px;
          padding-bottom: 20px;
          box-shadow: 0px 5px 0px 0px ${palette.secondary};
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          margin: 0px 6px;
        }
      }
    `;
  }}
`;

StyledMenu.displayName = 'StyledMenu';

export default StyledMenu;
