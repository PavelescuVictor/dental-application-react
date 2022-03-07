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
        height: 100%;
        overflow: hidden;
        position: absolute;

        svg {
          width: 100%;
        }
      }

      .gradient {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0%;
        left: 0%;
        opacity: 0%;
        animation: fadeIn 0.8s ease-out forwards;
        z-index: 4;
      }

      .gradient-left {
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 25%);
      }

      .gradient-right {
        background: linear-gradient(270deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 25%);
      }

      .banner__content {
        position: absolute;
        width: 100%;
        min-height: 100vh;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        z-index: 10;
      }

      .content__main {
        width: 50%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 5%;

        p {
          color: ${palette.basic.white};
          font-size: 1rem;
          line-height: 1rem;
          padding: 10px 10px 0px 10px;
          animation: banner__text__p 1s 1,
            banner__logo__stroke-change 0.9s ease-in-out forwards 0.55s;
        }

        .banner__learn-more {
          display: inline-block;
          width: 6.5em;
          margin: auto;
          font-size: 1rem;
          padding: 0.8em 0.5em;
          margin: 1em auto;
          background: -webkit-linear-gradient(-90deg, transparent 50%, white 50%);
          background-size: 6.5em 6.5em;
          border: 3px solid ${palette.basic.white};
          border-radius: 10px;
          transition: width 0.2s ease-in, border-radius 0.2s ease-out, background-position 0.6s ease;
          animation: banner__text__button 1s;
          color: ${palette.secondary};

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

      .main {
        height: 50vh;
        transform: translate(-50%, 0%);
        position: absolute;
        top: 10%;
        left: 50%;
        z-index: 2;
      }

      .top-left-leaves {
        height: 25vh;
        position: absolute;
        top: 10%;
        left: 5%;
        z-index: 2;
      }

      .top-right-leaves {
        height: 25vh;
        position: absolute;
        top: 10%;
        right: 5%;
        z-index: 2;
      }

      .girl {
        height: 75vh;
        width: 40vw;
        position: absolute;
        bottom: 0px;
        left: -5%;
        z-index: 2;
      }

      .guy {
        height: 75vh;
        width: 40vw;
        transform: scale(0.9);
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
      @keyframes banner__text__p {
        0% {
          opacity: 0%;
          margin-top: -3.5em;
        }
        30% {
          letter-spacing: 0.05em;
        }
        40% {
          opacity: 0%;
        }
        50% {
          letter-spacing: -0.1em;
        }
      }

      @keyframes banner__text__p__color-change {
        0% {
          color: white;
        }
        50% {
          color: var(--color-blue);
        }
        100% {
          color: white;
        }
      }

      @keyframes banner__text__button {
        0% {
          opacity: 0%;
        }
        30% {
          width: 10em;
          letter-spacing: -0.1em;
        }
        100% {
          width: 6.5em;
        }
      }
    `;
  }}
`;

StyledBanner.displayName = 'StyledBanner';

export default StyledBanner;
