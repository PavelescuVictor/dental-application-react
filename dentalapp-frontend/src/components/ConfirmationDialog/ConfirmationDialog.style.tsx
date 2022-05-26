import styled, { css } from 'styled-components';

const StyledConfirmationDialog = styled.div`
  ${(props) => {
    const {
      theme: { palette },
    } = props;
    return css`
      button {
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
    `;
  }}
`;

StyledConfirmationDialog.displayName = 'StyledConfirmationDialog';

export default StyledConfirmationDialog;
