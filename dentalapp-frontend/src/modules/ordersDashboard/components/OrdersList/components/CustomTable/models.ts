export type Order = 'asc' | 'desc';

export interface Data {
  id: number;
  doctorName: string;
  patientName: string;
  paid: boolean;
  redo: boolean;
  status: string;
  createdBy: number;
  createdAt: string;
  updatedBy: number;
  updatedAt: string;
  actions: string;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface CustomTableProps {
  className?: string;
  data: any;
  dense?: boolean;
}
