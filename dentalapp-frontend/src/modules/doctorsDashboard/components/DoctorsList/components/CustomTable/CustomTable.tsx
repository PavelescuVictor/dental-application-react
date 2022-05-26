/* eslint-disable max-lines-per-function */
import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Checkbox,
  Paper,
  IconButton,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from 'store/store';
import {
  doctorManagerActions,
  doctorManagerAsyncThunk,
} from 'store/slices/doctorManagerSlice/doctorManager';
import { getSelectedDoctor } from 'store/slices/doctorManagerSlice/doctorManagerSelectors';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import { ConfirmationDialog } from 'components';
import { DoctorsDashboardTabs } from 'modules/doctorsDashboard/models';
import { useSelector } from 'react-redux';
import StyledCustomTable from './CustomTable.style';
import { Data, Order, CustomTableProps } from './models';
import { ROWS_PER_PAGE_OPTIONS } from './constants';
import CustomTableHead from '../CustomTableHead';
import CustomTableToolbar from '../CustomTableToolbar';
import { stableSort, getComparator } from './helpers';

const CustomTable = ({ className, dense = true, data }: CustomTableProps) => {
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('firstName');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const selectedDoctor = useSelector(getSelectedDoctor);

  const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedDoctors = data.map((doctor: any) => doctor.id);
      setSelected(newSelectedDoctors);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    console.log(selectedIndex);
    if (selectedIndex === -1) dispatch(doctorManagerActions.setSelectedDoctor(id));
    else dispatch(doctorManagerActions.resetSelectedDoctor());
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleEditDoctor = (event: any, id: number) => {
    event.stopPropagation();
    dispatch(doctorManagerActions.setSelectedDoctor(id));
    dispatch(doctorManagerActions.setSelectedDashboardTab(DoctorsDashboardTabs.EDIT));
  };

  const handleRemoveDoctor = async (event: any, id: number) => {
    event.stopPropagation();
    dispatch(doctorManagerActions.setSelectedDoctor(id));
    setIsDialogOpen(true);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await dispatch(doctorManagerAsyncThunk.removeDoctor({ id: selectedDoctor })).unwrap();
      const alert = {
        alertMessage: 'Remove doctor successfully',
        alertType: AlertTypes.SUCCESS,
      };
      dispatch(alertManagerActions.setAlertData(alert));
    } catch (rejectedValueOrSerializedError) {
      const alert = {
        alertMessage: 'Remove doctor unsuccessfully',
        alertType: AlertTypes.ERROR,
      };
      dispatch(alertManagerActions.setAlertData(alert));
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    dispatch(doctorManagerActions.resetSelectedDoctor());
  };

  return (
    <StyledCustomTable className={className}>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%' }}>
          <CustomTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <CustomTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id as number);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id as number)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={data.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.firstName}
                        </TableCell>
                        <TableCell align="left">{row.lastName}</TableCell>
                        <TableCell align="left">
                          <IconButton
                            onClick={(event: any) => handleEditDoctor(event, row.id as number)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </IconButton>
                          <IconButton
                            onClick={(event: any) => handleRemoveDoctor(event, row.id as number)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <ConfirmationDialog
            isOpen={isDialogOpen}
            title="Add Confirmation"
            body="Are you sure you want to remove this doctor"
            confirmLabel="Confirm"
            onCancel={handleCancel}
            onConfirm={handleSubmit}
          />
        </Paper>
      </Box>
    </StyledCustomTable>
  );
};

export default CustomTable;
