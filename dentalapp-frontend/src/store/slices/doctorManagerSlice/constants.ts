import { DoctorsDashboardTabs } from 'modules/doctorsDashboard/models';
import { DoctorManagerState } from './models';

export const initialStateDoctorManager: DoctorManagerState = {
  doctors: [],
  isLoadingDoctors: false,
  hasErrorLoadingDoctors: false,
  hasErrorAddingDoctor: false,
  hasErrorEditingDoctor: false,
  hasErrorRemovingDoctor: false,
  filteredDoctors: [],
  selectedDoctor: null,
  hasSelectedDoctor: false,
  selectedDashboardTab: DoctorsDashboardTabs.LIST,
  selectedDoctorDetails: null,
  hasErrorLoadingSelectedDoctorDetails: false,
  isLoadingSelectedDoctorDetails: false,
};

export const DOCTOR_MANAGER_KEY = 'doctorManager';
