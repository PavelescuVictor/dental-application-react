import { RootState } from 'store/rootReducer';
import { DOCTOR_MANAGER_KEY } from './constants';
import { DoctorManagerState } from './models';

export const getDoctors = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.doctors;

export const getIsLoadingDoctors = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.isLoadingDoctors;

export const getHasErrorLoadingDoctors = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.hasErrorLoadingDoctors;

export const getHasErrorAddingDoctors = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.hasErrorAddingDoctor;

export const getHasErrorEditingDoctors = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.hasErrorEditingDoctor;

export const getHasErrorRemovingDoctorDetails = ({
  doctorManager: doctorManagerState,
}: RootState) => doctorManagerState.hasErrorRemovingDoctorDetails;

export const getHasErrorRemovingDoctorInfo = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.hasErrorRemovingDoctorInfo;

export const getFilteredDoctors = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.filteredDoctors;

export const getSelectedDoctor = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.selectedDoctor;

export const getDoctorDetails = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.selectedDoctorDetails;

export const getHasErrorLoadingDoctorDetails = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.hasErrorLoadingSelectedDoctorDetails;

export const getIsLoadingDoctorDetails = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.isLoadingSelectedDoctorDetails;

export const getDoctorInfo = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.selectedDoctorInfo;

export const getHasErrorLoadingDoctorInfo = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.hasErrorLoadingSelectedDoctorInfo;

export const getIsLoadingDoctorInfo = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.isLoadingSelectedDoctorInfo;

export const getHasSelectedDoctor = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.hasSelectedDoctor;

export const getSelectedDashboardTab = ({ doctorManager: doctorManagerState }: RootState) =>
  doctorManagerState.selectedDashboardTab;

const DoctorManagerSelectors = {
  getDoctorManagerState: (rootState: RootState): DoctorManagerState =>
    rootState[DOCTOR_MANAGER_KEY],
};

export default DoctorManagerSelectors;
