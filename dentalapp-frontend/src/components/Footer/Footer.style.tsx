import styled, { css } from 'styled-components';

const StyledFooter = styled.div`
  ${(props) => {
    const {
      theme: { palette, typography },
    } = props;
    return css`
      height: 12vh;
      background: ${palette.secondary};

      .footer__content {
        height: 100%;
        width: 90%;
        margin: auto;
        display: grid;
        grid-template-rows: 2fr 1fr;
        justify-content: center;
        align-items: center;
      }

      .content__links {
        height: 100%;
        width: 100vw;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-family: ${typography.primary};
        color: #454d61;
        list-style-type: none;

        a {
          position: relative;
          padding: 15px;
          font-size: 2.2rem;
          transition: padding 0.2s ease-in, box-shadow 0.2s ease-in, background 0s ease-in,
            border-radius 0.2s ease-in, margin 0.2s ease-in;
        }

        a:hover {
          background: ${palette.basic.white};
          color: ${palette.secondary};
          padding: 20px 15px 0px 15px;
          margin: 0px 10px;
          border-radius: 10px;
          box-shadow: 0px 6px 0px 0px ${palette.basic.white};
        }
      }

      .content__rights {
        margin: auto;
        font-size: 1rem;
        color: ${palette.basic.white};
        cursor: default;
        user-select: none;
      }
    `;
  }}
`;

StyledFooter.displayName = 'StyledFooter';

export default StyledFooter;
