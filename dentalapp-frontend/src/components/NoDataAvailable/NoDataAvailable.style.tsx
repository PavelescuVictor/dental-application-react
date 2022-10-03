import styled, { css } from 'styled-components';

const StyledNoDataAvailable = styled.div`
  ${(props) => {
    const { theme: palette } = props;
    return css`
      padding: 20px;
      p {
        text-align: center;
      }
    `;
  }}
`;

StyledNoDataAvailable.displayName = 'StyledNoDataAvailable';

export default StyledNoDataAvailable;
