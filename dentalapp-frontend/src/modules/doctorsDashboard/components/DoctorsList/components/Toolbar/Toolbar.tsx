import { useState } from 'react';
import {
  Toolbar as MaterialToolbar,
  Card,
  IconButton,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { routePaths } from 'routes/models';
import StyledToolbar from './Toolbar.style';

const TOOLBAR_TITLE = 'Medici';

enum InputTypes {
  FIRST_NAME = 'FIRST_NAME',
  LAST_NAME = 'LAST_NAME',
}

const Toolbar = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState<boolean>(false);
  const [filteredInputFirstName, setFilteredInputFirstName] = useState<string>('');
  const [filteredInputLastName, setFilteredInputLastName] = useState<string>('');

  const navigate = useNavigate();

  const handleRedirectToAddPage = (event: any) => {
    event.stopPropagation();
    navigate(routePaths.ADD_DOCTOR);
  };

  const handleShowSearchBar = (event: any) => {
    event.stopPropagation();
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const handleChangedInput = (event: any, inputType: InputTypes) => {
    switch (inputType) {
      case InputTypes.FIRST_NAME:
        setFilteredInputFirstName(event.target.value);
        break;
      case InputTypes.LAST_NAME:
        setFilteredInputLastName(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <StyledToolbar>
      <Card className="list" id="card">
        <MaterialToolbar id="list__toolbar">
          <Box my="2">
            <Typography className="toolbar__title">{TOOLBAR_TITLE}</Typography>
          </Box>
          <Box width="100%" justifyItems="end" display="flex" justifyContent="end" alignItems="end">
            <IconButton onClick={handleRedirectToAddPage}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </IconButton>
            <IconButton onClick={handleShowSearchBar}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </IconButton>
          </Box>
        </MaterialToolbar>
        {isSearchBarVisible && (
          <MaterialToolbar id="toolbar__search">
            <div className="search__wrapper">
              <TextField
                label="First Name"
                onChange={(event) => handleChangedInput(event, InputTypes.FIRST_NAME)}
              >
                {filteredInputFirstName}
              </TextField>

              <TextField
                label="Last Name"
                onChange={(event) => handleChangedInput(event, InputTypes.LAST_NAME)}
              >
                {filteredInputLastName}
              </TextField>
            </div>
          </MaterialToolbar>
        )}
      </Card>
    </StyledToolbar>
  );
};

export default Toolbar;
