import { alpha } from '@mui/material/styles';
import { Delete as DeleteIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import StyledCustomToolbar from './CustomToolbar.style';
import { CustomTableToolbarProps } from './models';

const CustomTableToolbar = ({ numSelected }: CustomTableToolbarProps) => (
  <StyledCustomToolbar>
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme: any) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Doctors
        </Typography>
      )}
      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  </StyledCustomToolbar>
);

export default CustomTableToolbar;
