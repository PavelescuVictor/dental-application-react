export type AddDoctorPayload = {
  firstName: string;
  lastName: string;
  cabinet: string;
  phone: string;
};

export type EditDoctorPayload = {
  id: string;
  firstName?: string;
  lastName?: string;
  cabinet?: string;
  phone?: string;
};

export type RemoveDoctorPayload = { id: string };

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  cabinet: string;
}

export interface DoctorManagerState {
  doctorList: Doctor[];
  isLoadingDoctors: boolean;
  hasErrorLoadingDoctors: boolean;
  hasErrorAddingDoctor: boolean;
  hasErrorEditingDoctor: boolean;
  hasErrorRemovingDoctor: boolean;
  filteredDoctorList: Doctor[];
  selectedDoctor: Doctor | null;
  hasSelectedDoctor: boolean;
}
