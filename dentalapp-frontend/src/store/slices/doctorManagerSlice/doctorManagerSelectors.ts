import { RootState } from 'store/rootReducer';
import { DOCTOR_MANAGER_KEY } from './constants';
import { DoctorManagerState, Doctor } from './models';

export const selectDoctors = ({ doctorManager }: RootState) => doctorManager.doctors;
export const selectIsLoadingDoctors = ({ doctorManager }: RootState) =>
  doctorManager.isLoadingDoctors;
export const selectHasErrorLoadingDoctors = ({ doctorManager }: RootState) =>
  doctorManager.hasErrorLoadingDoctors;
export const selectHasErrorAddingDoctors = ({ doctorManager }: RootState) =>
  doctorManager.hasErrorAddingDoctor;
export const selectHasErrorEditingDoctors = ({ doctorManager }: RootState) =>
  doctorManager.hasErrorEditingDoctor;
export const selectHasErrorRemovingDoctors = ({ doctorManager }: RootState) =>
  doctorManager.hasErrorRemovingDoctor;
export const selectFilteredDoctors = ({ doctorManager }: RootState) =>
  doctorManager.filteredDoctors;
export const getSelectedDoctor = ({ doctorManager: state }: RootState) => state.selectedDoctor;
export const getSelectedDoctorData = ({ doctorManager: state }: RootState) =>
  state.doctors.find((doctor: Doctor) => doctor.id === state.selectedDoctor);
export const getHasSelectedDoctor = ({ doctorManager }: RootState) =>
  doctorManager.hasSelectedDoctor;
export const getSelectedDashboardTab = ({ doctorManager }: RootState) =>
  doctorManager.selectedDashboardTab;

const DoctorManagerSelectors = {
  getDoctorManagerState: (rootState: RootState): DoctorManagerState =>
    rootState[DOCTOR_MANAGER_KEY],
};

export default DoctorManagerSelectors;
