import styled, { css } from 'styled-components';

const StyledDoctorsList = styled.div`
  ${(props) => {
    const {
      theme: { palette },
    } = props;
    return css`
      background: #e7e9ee;
    `;
  }}
`;

StyledDoctorsList.displayName = 'StyledDoctorsList';

export default StyledDoctorsList;
