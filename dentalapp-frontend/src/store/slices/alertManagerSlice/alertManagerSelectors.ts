import { RootState } from 'store/store';
import { ALERT_MANAGER_KEY } from './constants';
import { AlertManagerState } from './models';

export const selectIsAlertVisible = ({ alertManager }: RootState) => alertManager.isVisible;
export const selectAlertMessage = ({ alertManager }: RootState) => alertManager.message;
export const selectAlertType = ({ alertManager }: RootState) => alertManager.type;
export const selectAlertData = ({ alertManager }: RootState) => ({
  message: alertManager.message,
  type: alertManager.type,
  isVisible: alertManager.isVisible,
});

const userManagerSelectors = {
  getDialogManagerState: (rootState: RootState): AlertManagerState => rootState[ALERT_MANAGER_KEY],
};

export default userManagerSelectors;
