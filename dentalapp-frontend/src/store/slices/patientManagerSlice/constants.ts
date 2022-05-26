import { PatientManagerState } from './models';

export const initialStatePatientManager: PatientManagerState = {
  patients: [],
  isLoadingPatients: false,
  hasErrorLoadingPatients: false,
  hasErrorAddingPatient: false,
  hasErrorEditingPatient: false,
  hasErrorRemovingPatient: false,
  filteredPatients: [],
  selectedPatient: null,
  hasSelectedPatient: false,
};

export const PATIENT_MANAGER_KEY = 'patientManager';
