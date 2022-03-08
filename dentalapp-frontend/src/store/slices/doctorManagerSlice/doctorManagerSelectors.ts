import { RootState } from 'store/rootReducer';
import { DOCTOR_MANAGER_KEY } from './constants';
import { DoctorManagerState } from './models';

export const selectDoctorList = (state: DoctorManagerState) => state.doctorList;
export const selectIsLoadingDoctors = (state: DoctorManagerState) => state.isLoadingDoctors;
export const selectHasErrorLoadingDoctors = (state: DoctorManagerState) =>
  state.hasErrorLoadingDoctors;
export const selectHasErrorAddingDoctors = (state: DoctorManagerState) =>
  state.hasErrorAddingDoctor;
export const selectHasErrorEditingDoctors = (state: DoctorManagerState) =>
  state.hasErrorEditingDoctor;
export const selectHasErrorRemovingDoctors = (state: DoctorManagerState) =>
  state.hasErrorRemovingDoctor;

export const selectFilteredDoctorList = (state: DoctorManagerState) => state.filteredDoctorList;
export const getSelectedDoctor = (state: DoctorManagerState) => state.selectedDoctor;
export const getHasSelectedDoctor = (state: DoctorManagerState) => state.hasSelectedDoctor;

const DoctorManagerSelectors = {
  getDoctorManagerState: (rootState: RootState): DoctorManagerState =>
    rootState[DOCTOR_MANAGER_KEY],
};

export default DoctorManagerSelectors;
