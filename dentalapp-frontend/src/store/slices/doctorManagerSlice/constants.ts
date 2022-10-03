import { DoctorsDashboardTabs } from 'modules/doctorsDashboard/models';
import { DoctorManagerState } from './models';

export const initialStateDoctorManager: DoctorManagerState = {
  doctors: [],
  filteredDoctors: [],
  selectedDoctor: null,
  selectedDashboardTab: DoctorsDashboardTabs.LIST,
  selectedDoctorDetails: null,
  selectedDoctorInfo: null,
  hasSelectedDoctor: false,
  isLoadingDoctors: false,
  isLoadingSelectedDoctorDetails: false,
  isLoadingSelectedDoctorInfo: false,
  isAddingDoctor: false,
  isEditingDoctorDetails: false,
  isEditingDoctorInfo: false,
  isRemovingDoctorDetails: false,
  isRemovingDoctorInfo: false,
  hasErrorLoadingDoctors: false,
  hasErrorAddingDoctor: false,
  hasErrorEditingDoctorDetails: false,
  hasErrorEditingDoctorInfo: false,
  hasErrorRemovingDoctorDetails: false,
  hasErrorRemovingDoctorInfo: false,
  hasErrorLoadingSelectedDoctorDetails: false,
  hasErrorLoadingSelectedDoctorInfo: false,
};

export const DOCTOR_MANAGER_KEY = 'doctorManager';
