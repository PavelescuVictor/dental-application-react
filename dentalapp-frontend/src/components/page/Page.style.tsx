import styled, { css } from 'styled-components';
import { StyledPageProps, ViewType } from './models';

const StyledPage = styled.div<StyledPageProps>`
  ${(props) => {
    const { viewType } = props;
    return css`
      ${viewType === ViewType.FULL_VIEWPORT &&
      css`
        width: 90vw;
        height: 100%;
        margin: auto;
      `}
      ${viewType === ViewType.RIGHT_SIDE_CONTENT &&
      css`
        width: 40vw;
        height: 100%;
        margin-left: auto;
        margin-right: 5vw;
      `}
      ${viewType === ViewType.LEFT_SIDE_CONTENT &&
      css`
        width: 40vw;
        height: 100%;
        margin-right: auto;
        margin-left: 5vw;
      `}
    `;
  }}
`;

StyledPage.displayName = 'StyledPage';

export default StyledPage;
