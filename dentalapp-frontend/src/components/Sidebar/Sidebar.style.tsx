import styled, { css } from 'styled-components';

const StyledSidebar = styled.div`
  ${(props) => {
    const {
      theme: { palette },
    } = props;
    return css;
  }}
`;

StyledSidebar.displayName = 'StyledSidebar';

export default StyledSidebar;
