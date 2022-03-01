import styled, { css } from 'styled-components';

const StyledScrollTop = styled.div`
  ${(props) => {
    const {
      theme: { palette },
    } = props;
    return css`
      .scroll-top-button {
        position: fixed;
        width: 50px;
        height: 50px;
        right: 16px;
        bottom: 16px;
        background: ${palette.basic.white};
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        animation: rotate 0.6s ease-in-out both;
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
        height: 100%;
        width: 100%;
        path {
          fill: ${palette.secondary};
        }
      }
    `;
  }}
`;

StyledScrollTop.displayName = 'StyledScrollTop';

export default StyledScrollTop;
