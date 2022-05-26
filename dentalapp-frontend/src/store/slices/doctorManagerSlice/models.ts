import { DoctorsDashboardTabs } from 'modules/doctorsDashboard/models';

export type AddDoctorPayload = {
  firstName: string;
  lastName: string;
};

export type EditDoctorPayload = {
  id: string;
  firstName?: string;
  lastName?: string;
};

export type RemoveDoctorPayload = { id: string };

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: string;
}

export interface DoctorManagerState {
  doctors: Doctor[];
  isLoadingDoctors: boolean;
  hasErrorLoadingDoctors: boolean;
  hasErrorAddingDoctor: boolean;
  hasErrorEditingDoctor: boolean;
  hasErrorRemovingDoctor: boolean;
  filteredDoctors: Doctor[];
  selectedDoctor: number | null;
  hasSelectedDoctor: boolean;
  selectedDashboardTab: DoctorsDashboardTabs;
}
