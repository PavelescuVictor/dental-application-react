import styled, { css } from 'styled-components';

const StyledOrdersNavbar = styled.nav`
  ${(props) => {
    const {
      theme: { palette },
    } = props;
    return css`
      width: 100%;
      border-bottom: 6px solid #e7e9ee;
      background: ${palette.basic.white};

      .navbar-list {
        height: 100%;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style-type: none;
      }

      button {
        cursor: pointer;

        &:hover + button li {
          border-bottom-left-radius: 15px;
        }

        li {
          display: grid;
          grid-template-rows: 1fr 1fr;
          grid-gap: 10px;
          padding: 20px;
          background: ${palette.basic.white};
          transition: padding-top 0.1s ease-in, padding-bottom 0.1s ease-in, box-shadow 0.1s ease-in,
            background 0s ease-in, border-radius 0.1s ease-in, margin 0.1s ease-in;
          font-size: 1.2rem;
          line-height: 1.2em;
          text-align: center;
          color: #454d61;

          &:hover {
            padding-top: 15px;
            padding-bottom: 25px;
            /* background: #f5f6fa; */
            box-shadow: 0px 6px 0px 0px #4800ad;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            margin: 0px 6px;
          }

          svg {
            margin: auto;
            height: 1.5rem;
          }
        }

        .focused {
          padding-top: 15px;
          padding-bottom: 25px;
          box-shadow: 0px 6px 0px 0px #4800ad;
          position: relative;
          background-color: #5602ca;
          color: ${palette.basic.white};
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          position: relative;
        }
      }
    `;
  }}
`;

StyledOrdersNavbar.displayName = ' StyledOrdersNavbar';

export default StyledOrdersNavbar;
