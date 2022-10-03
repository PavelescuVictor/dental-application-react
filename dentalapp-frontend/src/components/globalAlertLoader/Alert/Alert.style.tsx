import styled, { css } from 'styled-components';

interface StyledAlertProps {
  className?: string;
}

const StyledAlert = styled.div<StyledAlertProps>`
  ${(props) => {
    const {
      theme: { palette },
    } = props;
    return css``;
  }}
`;

StyledAlert.displayName = 'StyledAlert';

export default StyledAlert;
