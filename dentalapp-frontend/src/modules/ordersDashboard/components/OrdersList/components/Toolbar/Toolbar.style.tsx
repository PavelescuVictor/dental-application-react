import styled, { css } from 'styled-components';

const StyledToolbar = styled.div`
  ${(props) => {
    const {
      theme: { palette, typography },
    } = props;
    return css`
      .list {
        min-height: 100%;
        text-align: center;
        margin-bottom: 6px;
      }

      #card {
        box-shadow: none;
      }

      #list__toolbar {
        box-shadow: none;
        margin-bottom: 6px;

        .toolbar__title {
          font-family: ${typography.font.primary};
          font-size: 1.5rem;
        }
      }

      #toolbar__search {
        box-shadow: none;
        margin-bottom: 6px;
        color: red;
      }

      .search__wrapper {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 5%;
      }
    `;
  }}
`;

StyledToolbar.displayName = 'StyledToolbar';

export default StyledToolbar;
