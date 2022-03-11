import { RootState } from 'store/store';
import { ALERT_MANAGER_KEY } from './constants';
import { AlertManagerState } from './models';

export const selectIsAlertVisible = ({ alertManager: state }: RootState) => state.isVisible;
export const selectAlertMessage = ({ alertManager: state }: RootState) => state.message;
export const selectAlertType = ({ alertManager: state }: RootState) => state.type;
export const selectAlertData = ({ alertManager: state }: RootState) => ({
  message: state.message,
  type: state.type,
  isVisible: state.isVisible,
});

const userManagerSelectors = {
  getDialogManagerState: (rootState: RootState): AlertManagerState => rootState[ALERT_MANAGER_KEY],
};

export default userManagerSelectors;
