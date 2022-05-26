import styled, { css } from 'styled-components';

const StyledDoctorsDetails = styled.div`
  ${(props) => {
    const {
      theme: { palette },
    } = props;

    return css`
      .content {
        position: relative;
        min-height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }

      .card__wrapper {
        width: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
      }

      .list__wrapper {
        width: fit-content;
        margin: auto;
      }

      .list__content {
        list-style-type: none;
        display: grid;
        grid-auto-rows: auto;
        padding: 0px 6px;
        background-color: #e7e9ee;

        li {
          display: grid;
          grid-template-columns: minmax(150px, 1fr) 5fr;
          background: ${palette.basic.white};
          color: #454d61;
          border-bottom: 6px solid #e7e9ee;

          p {
            padding: 15px;
            text-align: center;

            &:first-child {
              border-right: 6px solid #e7e9ee;
            }
          }

          &:first-child {
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
          }

          &:last-child {
            border-bottom: 0px;
          }
        }
      }
    `;
  }}
`;

StyledDoctorsDetails.displayName = 'StyledDoctorsDetails';

export default StyledDoctorsDetails;
