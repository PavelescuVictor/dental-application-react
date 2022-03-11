/* eslint-disable max-lines-per-function */
import styled, { css } from 'styled-components';

const StyledBanner = styled.div`
  ${(props) => {
    const {
      theme: { palette, typography },
    } = props;

    return css`
      min-height: 100vh;
      /* padding: 8em 4em 6em 4em; */
      position: relative;

      .background {
        width: 100%;
        min-height: 100%;
        overflow: hidden;
        position: absolute;
        transform: scale(1.3);
        transform-origin: top left;

        svg {
          min-height: 100vh;
        }
      }

      .gradient {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0%;
        left: 0%;
        z-index: 20;
      }

      .gradient--left {
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 25%);
      }

      .gradient--right {
        background: linear-gradient(270deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 25%);
      }

      .banner__content {
        position: absolute;
        width: 100%;
        min-height: 100vh;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        z-index: 30;
      }

      .content__main {
        width: 50%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 4vh;

        .banner__learn-more {
          display: inline-block;
          width: 6.5em;
          margin: auto;
          font-size: 1rem;
          padding: 0.8em 0.5em;
          margin: 1em auto;
          background: -webkit-linear-gradient(-90deg, transparent 50%, ${palette.basic.white} 50%);
          background-size: 6.5em 6.5em;
          border: 3px solid ${palette.basic.white};
          border-radius: 10px;
          transition: width 0.2s ease-in, border-radius 0.2s ease-out, background-position 0.6s ease;
          letter-spacing: -10px;
          animation: learn-more__stretch 0.4s ease-out,
            learn-more__letter-spacing 0.4s ease-out forwards;
          color: ${palette.secondary};

          a {
            opacity: 0%;
            animation: fadeIn 0.4s ease-in 0.3s forwards;
          }

          &:hover {
            width: 8.5em;
            background-position: 0px -60px;
            border-radius: 50px;

            & > a {
              color: ${palette.secondary};
            }
          }

          a {
            color: ${palette.basic.white};
            transition: color 0.2s ease-in;
          }
        }
      }

      .logo {
        transform: translate(-50%, 0%);
        position: absolute;
        bottom: 15vh;
        left: 50%;
        z-index: 2;
      }

      .main {
        height: 50vh;
        transform: translate(-50%, 0%);
        position: absolute;
        top: 10%;
        left: 50%;
        z-index: 2;
      }

      .top-left-leaves {
        height: 40vh;
        position: absolute;
        top: 10%;
        left: 5%;
        z-index: 2;
      }

      .top-right-leaves {
        height: 40vh;
        position: absolute;
        top: 10%;
        right: 5%;
        z-index: 2;
      }

      .girl {
        height: 85vh;
        width: 40vw;
        position: absolute;
        bottom: 0px;
        left: -5%;
        z-index: 2;
      }

      .guy {
        height: 85vh;
        width: 40vw;
        position: absolute;
        bottom: 0px;
        right: 0%;
        z-index: 2;
      }

      /* Media Queries */
      @media screen and (max-width: 1700px) {
        .banner p {
          display: none;
        }
        .banner-inner {
          bottom: 90px;
        }
      }

      /* Animations */
      @keyframes learn-more__stretch {
        0% {
          width: 30px;
        }

        50% {
          width: 140px;
          border-radius: 30px;
        }
      }

      @keyframes learn-more__letter-spacing {
        to {
          letter-spacing: 0px;
        }
      }
    `;
  }}
`;

StyledBanner.displayName = 'StyledBanner';

export default StyledBanner;
