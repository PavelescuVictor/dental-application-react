import styled, { css } from 'styled-components';

const StyledLoader = styled.div`
  ${(props) => {
    const {
      theme: { palette },
    } = props;
    return css``;
  }}
`;

StyledLoader.displayName = 'StyledLoader';

export default StyledLoader;
