import styled, { css } from 'styled-components';

const StyledLoginPage = styled.div`
  ${(props) => {
    const {
      theme: { palette },
    } = props;
    return css`
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .login__content {
        height: 100vh;
        width: 100%;
      }

      .content__form {
        height: 100%;
        padding: calc(8vh + 90px) 90px 90px 90px;
      }

      .form__wrapper {
        height: 100%;
        display: grid;
        grid-template-rows: 1fr auto 1fr;
        padding: 30px 0px;
        justify-content: center;
        align-items: center;

        p {
          font-size: 1.8rem;
          text-align: center;
          animation: form__wrapper__p__scale 0.3s ease-in-out forwards;
        }

        .form {
          width: 100%;
          display: grid;
          margin: auto;
          grid-template-rows: auto auto auto 1fr;
          align-content: space-between;
          animation: form__wrapper__form__width 0.4s ease-in-out forwards;
        }

        .form__buttons {
          justify-self: center;
        }
      }

      .banner__overlay {
        height: 100%;
      }

      .overlay__image {
        position: absolute;
        height: 100%;
        width: 50%;
        overflow: hidden;
        opacity: 0%;
        animation: overlay__image__slide-right 0.4s ease-out forwards,
          overlay__image__fade-in 0.3s ease-in-out forwards;

        svg {
          height: 100%;
        }
      }

      @keyframes overlay__image__slide-right {
        from {
          left: -25%;
        }
        to {
          left: 0%;
        }
      }

      @keyframes overlay__image__fade-in {
        from {
          opacity: 0%;
        }
        to {
          opacity: 100%;
        }
      }

      @keyframes overlay__color__slide-right {
        from {
          left: -25%;
        }
        to {
          left: 0%;
        }
      }

      @keyframes form__wrapper__p__scale {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }
      }

      @keyframes form__wrapper__form__width {
        from {
          padding-top: 90px;
        }
        to {
          padding-top: 0px;
        }
      }
    `;
  }}
`;

StyledLoginPage.displayName = 'StyledLoginPage';

export default StyledLoginPage;
