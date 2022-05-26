import styled, { css } from 'styled-components';

const CustomToolbar = styled.div`
  ${(props) => {
    const {
      theme: { palette },
    } = props;
    return css``;
  }}
`;

CustomToolbar.displayName = 'CustomToolbar';

export default CustomToolbar;
