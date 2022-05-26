import styled, { css } from 'styled-components';

const StyledCustomTableHead = styled.div`
  ${(props) => {
    const {
      theme: { palette },
    } = props;
    return css`
      border-bottom: 6px solid green;
    `;
  }}
`;

StyledCustomTableHead.displayName = 'StyledCustomTableHead';

export default StyledCustomTableHead;
