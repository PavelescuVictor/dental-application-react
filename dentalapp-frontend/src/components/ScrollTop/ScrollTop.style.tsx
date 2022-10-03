import styled, { css } from 'styled-components';

const StyledScrollTop = styled.div`
  ${(props) => {
    const {
      theme: { palette },
    } = props;
    return css`
      width: 50px;
      height: 50px;

      .scroll-top-button {
        width: 100%;
        height: 100%;
        background: ${palette.basic.white};
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        transition: border-radius 0.2s ease-in-out;
        z-index: 100;
        cursor: pointer;
      }

      .scroll-top-button:hover {
        border-radius: 50px;
      }

      .scroll-top-button:hover > .arrow-up {
        transform: rotate(360deg);
      }

      .arrow-up {
        transition: transform 0.4s ease-in-out;
        font-size: 40px;

        path {
          fill: ${palette.secondary};
        }
      }
    `;
  }}
`;

StyledScrollTop.displayName = 'StyledScrollTop';

export default StyledScrollTop;
