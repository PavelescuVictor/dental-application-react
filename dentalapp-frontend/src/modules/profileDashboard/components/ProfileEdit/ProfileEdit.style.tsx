import styled, { css } from 'styled-components';

const StyledProfileEdit = styled.div`
  ${(props) => {
    const {
      theme: { palette, typography },
    } = props;
    return css`
      .form__wrapper {
        width: 80%;
        margin: auto;
        display: grid;
        grid-template-columns: 1rf 1fr;
        grid-gap: 100px;
        padding-top: 60px;
      }

      .form-title {
        text-align: center;
        font-family: ${typography.font.primary};
        font-size: 1.8rem;
      }

      .form-labels {
        font-family: ${typography.font.primary};
      }

      form {
        display: grid;
        grid-template-rows: auto auto 1fr;
        grid-gap: 20px;
        align-content: space-between;
        animation: form__wrapper__form__width 0.4s ease-in-out forwards;
      }

      .form__buttons {
        width: fit-content;
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-self: center;

        .add-button,
        .reset-button {
          display: inline-block;
          width: 7.5em;
          margin: auto;
          font-size: 20px;
          padding: 20px 5px;
          background: -webkit-linear-gradient(-90deg, #f1f1f1 50%, ${palette.secondary} 50%);
          background-size: 6.5em 6.5em;
          border-radius: 50px;
          margin: 10px;
          transition: background-position 0.6s ease, color 0.2s ease-in;
          cursor: pointer;
          color: ${palette.secondary};

          &:hover {
            background-position: 0px -70px;
            color: ${palette.basic.white};
          }
        }

        button:disabled {
          background: ${palette.basic.white};
          border: 3px solid #bbbbbb;
          color: #bbbbbb;

          &:hover {
            color: #bbbbbb;
          }
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

StyledProfileEdit.displayName = 'StyledProfileEdit';

export default StyledProfileEdit;
