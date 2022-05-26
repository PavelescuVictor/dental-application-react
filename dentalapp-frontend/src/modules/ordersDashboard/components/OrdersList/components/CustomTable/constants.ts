import { HeadCell } from './models';

export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

export const headCells: readonly HeadCell[] = [
  {
    id: 'doctorName',
    numeric: false,
    disablePadding: true,
    label: 'Doctor Name',
  },
  {
    id: 'patientName',
    numeric: false,
    disablePadding: false,
    label: 'Patient Name',
  },
  {
    id: 'paid',
    numeric: false,
    disablePadding: false,
    label: 'Paid',
  },
  {
    id: 'redo',
    numeric: false,
    disablePadding: false,
    label: 'Redo',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];
