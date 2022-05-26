import styled, { css } from 'styled-components';

const StyledOrdersList = styled.div`
  ${(props) => {
    const {
      theme: { palette },
    } = props;
    return css`
      background: #e7e9ee;
    `;
  }}
`;

StyledOrdersList.displayName = 'StyledOrdersList';

export default StyledOrdersList;
