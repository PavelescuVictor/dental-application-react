export type AddPatientPayload = {
  firstName: string;
  lastName: string;
  cabinet: string;
  phone: string;
};

export type EditPatientPayload = {
  id: string;
  firstName?: string;
  lastName?: string;
  cabinet?: string;
  phone?: string;
};

export type RemovePatientPayload = { id: string };

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  cabinet: string;
}

export interface PatientManagerState {
  patientList: Patient[];
  isLoadingPatients: boolean;
  hasErrorLoadingPatients: boolean;
  hasErrorAddingPatient: boolean;
  hasErrorEditingPatient: boolean;
  hasErrorRemovingPatient: boolean;
  filteredPatientList: Patient[];
  selectedPatient: Patient | null;
  hasSelectedPatient: boolean;
}
