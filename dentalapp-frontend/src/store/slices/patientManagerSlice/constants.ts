import { PatientManagerState } from './models';

export const initialStatePatientManager: PatientManagerState = {
  patientList: [],
  isLoadingPatients: false,
  hasErrorLoadingPatients: false,
  hasErrorAddingPatient: false,
  hasErrorEditingPatient: false,
  hasErrorRemovingPatient: false,
  filteredPatientList: [],
  selectedPatient: null,
  hasSelectedPatient: false,
};

export const PATIENT_MANAGER_KEY = 'patientManager';
