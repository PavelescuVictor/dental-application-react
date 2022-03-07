import styled, { css } from 'styled-components';
import { BaseButtonProps } from './models';

const StyledButton = styled.button<BaseButtonProps>`
  ${(props) => {
    const {
      theme: { palette },
    } = props;

    return css``;
  }}
`;

StyledButton.displayName = 'StyledButton';

export default StyledButton;
