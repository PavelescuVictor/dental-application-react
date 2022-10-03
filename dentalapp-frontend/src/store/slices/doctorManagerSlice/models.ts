import { DoctorsDashboardTabs } from 'modules/doctorsDashboard/models';

export type AddDoctorPayload = {
  firstName: string;
  lastName: string;
};

export type EditDoctorDetailsPayload = {
  id: string;
  firstName?: string;
  lastName?: string;
};

export type EditDoctorInfoPayload = {
  id: string;
  cabinet?: string;
  phone?: string;
};

export type RemoveDoctorDetailsPayload = { id: string };

export type RemoveDoctorInfoPayload = { id: string };

export type RequestDoctorDetailsPayload = { id: string };

export type RequestDoctorInfoPayload = { id: string };

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  createdBy: number;
  createdByName: string;
  updatedAt: string;
  updatedBy: string;
  updatedByName: string;
}

export interface DoctorDetails {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  createdBy: number;
  createdByName: string;
  updatedAt: string;
  updatedBy: string;
  updatedByName: string;
}

export interface DoctorInfo {
  id: number;
  doctorId: number;
  cabinet: number;
  phone: string;
  createdAt: string;
  createdBy: number;
  createdByName: string;
  updatedAt: string;
  updatedBy: string;
  updatedByName: string;
}

export interface DoctorManagerState {
  doctors: Doctor[];
  filteredDoctors: Doctor[];
  selectedDoctor: number | null;
  hasSelectedDoctor: boolean;
  selectedDashboardTab: DoctorsDashboardTabs;
  selectedDoctorDetails: DoctorDetails | null;
  selectedDoctorInfo: DoctorInfo | null;
  isLoadingDoctors: boolean;
  isLoadingSelectedDoctorDetails: boolean;
  isLoadingSelectedDoctorInfo: boolean;
  isAddingDoctor: boolean;
  isEditingDoctorDetails: boolean;
  isEditingDoctorInfo: boolean;
  isRemovingDoctorDetails: boolean;
  isRemovingDoctorInfo: boolean;
  hasErrorLoadingDoctors: boolean;
  hasErrorAddingDoctor: boolean;
  hasErrorEditingDoctorDetails: boolean;
  hasErrorEditingDoctorInfo: boolean;
  hasErrorRemovingDoctorDetails: boolean;
  hasErrorRemovingDoctorInfo: boolean;
  hasErrorLoadingSelectedDoctorDetails: boolean;
  hasErrorLoadingSelectedDoctorInfo: boolean;
}
