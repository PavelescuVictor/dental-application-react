import styled, { css } from 'styled-components';
import { BaseButtonProps } from './models';

const StyledButton = styled.button<BaseButtonProps>`
  ${(props) => {
    const {
      theme: { palette },
    } = props;

    return css`
      margin: 0rem 29px;
      path {
        fill: ${palette.basic.white};
      }

      &:hover {
        path {
          fill: ${palette.primary};
        }
      }
    `;
  }}
`;

StyledButton.displayName = 'StyledButton';

export default StyledButton;
