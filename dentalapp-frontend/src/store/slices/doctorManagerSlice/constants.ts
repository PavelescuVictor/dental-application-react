import { DoctorManagerState } from './models';

export const initialStateDoctorManager: DoctorManagerState = {
  doctorList: [],
  isLoadingDoctors: false,
  hasErrorLoadingDoctors: false,
  hasErrorAddingDoctor: false,
  hasErrorEditingDoctor: false,
  hasErrorRemovingDoctor: false,
  filteredDoctorList: [],
  selectedDoctor: null,
  hasSelectedDoctor: false,
};

export const DOCTOR_MANAGER_KEY = 'doctorManager';
