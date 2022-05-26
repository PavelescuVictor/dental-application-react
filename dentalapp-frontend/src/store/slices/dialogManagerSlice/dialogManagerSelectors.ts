import { RootState } from 'store/store';
import { DIALOG_MANAGER_KEY } from './constants';
import { DialogManagerState } from './models';

export const selectIsDialogVisible = ({ dialogManager }: RootState) => dialogManager.isVisible;

const userManagerSelectors = {
  getDialogManagerState: (rootState: RootState): DialogManagerState =>
    rootState[DIALOG_MANAGER_KEY],
};

export default userManagerSelectors;
