import styled, { css } from 'styled-components';

interface StyledGlobalAlertLoaderProps {
  className?: string;
  onClick?: (event: any) => void;
}

const StyledGlobalAlertLoader = styled.div<StyledGlobalAlertLoaderProps>`
  ${(props) => {
    const {
      theme: { palette },
    } = props;
    return css`
      position: absolute;
      top: 8vh;
      left: 50%;
      transform: translate(-50%, 0);
      display: inline-block;
      width: fit-content;
      padding: 15px 20px;
      margin: 1em auto;
      background: -webkit-linear-gradient(-90deg, transparent 50%, ${palette.validation.info} 50%);
      background-size: 6.5em 8.5em;
      border: 3px solid ${palette.basic.white};
      border-radius: 10px;
      animation: alert-box__slide-down 0.5s ease-out forwards, alert-box__fill .8s ease-out forwards .1s;
      user-select: none;
      z-index: 10;

      p {
        cursor: pointer;
        opacity: 0%;
        text-align: center;
        color: ${palette.basic.white};
        font-size: 1.2rem;
        letter-spacing: -10px;
        animation: alert-box__text-fade-in 0.6s ease-out forwards 0.3s;
        transition: padding .2s ease-in-out;
      }

      .hide-button {
        position: absolute;
        right: 20px;
        opacity: 0;
        transform: rotate(30deg)
      }

      &:hover {
        p { 
          padding: 0 20px 0 10px;
        }

        p::after {
          content: '';
        }

        .hide-button {
          opacity: 1;
          transform: rotate(-30deg)
        }
      }

      &.default,
      &.info {
        background: -webkit-linear-gradient(-90deg, transparent 50%, ${palette.basic.white} 50%);
        background-size: 6.5em 8.5em;
        border-color: ${palette.basic.white};

        p {
          color: ${palette.basic.black};
        }
      }

      &.success,
      &.warning,
      &.error {
        p {
          color: ${palette.basic.white};
        }
      }

      &.success {
        background: -webkit-linear-gradient(
          -90deg,
          transparent 50%,
          ${palette.validation.valid} 50%
        );
        background-size: 6.5em 8.5em;
        border-color: ${palette.validation.valid};
      }

      &.warning {
        background: -webkit-linear-gradient(
          -90deg,
          transparent 50%,
          ${palette.validation.warning} 50%
        );
        background-size: 6.5em 8.5em;
        border-color: ${palette.validation.warning};
      }

      &.error {
        background: -webkit-linear-gradient(
          -90deg,
          transparent 50%,
          ${palette.validation.error} 50%
        );
        background-size: 6.5em 8.5em;
        border-color: ${palette.validation.error};
      }

      @keyframes alert-box__fill {
        from {
          background-position: 0px 0px;
          border-radius: 10px;
        }
        to {
          background-position: 0px -70px;
          border-radius: 50px;
        }
      }

      @keyframes alert-box__slide-down {
        0% {
          top: 8vh
          padding: 15px 5px;
        }
        50% {
          top: calc(8vh * 2.5);
          /* padding: 10px 70px; */
        }
        100% {
          top: calc(8vh * 1.75);
          padding: 15px 30px;
        }
      }

      @keyframes alert-box__text-fade-in {
        0% {
          opacity: 0;
          letter-spacing: -10px;
        }
        60% {
          letter-spacing: 0px;
        }
        100% {
          opacity: 1;
          letter-spacing: 0px;
        }
      }

      @keyframes alert-box__shake {
        0% {
          transform: rotate(0deg);
        }

        20% {
          transform: rotate(5deg);
        }

        40% {
          transform: rotate(-10deg);
        }

        60% {
          transform: rotate(10deg);
        }

        100% {
          transform: rotate(-5deg);
        }
      }
    `;
  }}
`;

StyledGlobalAlertLoader.displayName = 'StyledGlobalAlertLoader';

export default StyledGlobalAlertLoader;
