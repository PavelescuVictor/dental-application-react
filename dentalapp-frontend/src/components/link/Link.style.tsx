import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  ${() => css``}
`;

StyledLink.displayName = 'StyledLink';

export default StyledLink;
