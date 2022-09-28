import { AlertManagerState } from './models';

// Alert Default Render Time in ms. Ex: 5000 = 5 seconds
export const ALERT_DEFAULT_TIME = 5000;
// alertBoxTypes: {
//     LIST: 'LIST',
//     OVERRIDE: 'OVERRIDE',
//   },
//   alertBehaviourType: {
//     TEMPORARY: 'TEMPORARY',
//     PERSISTENT: 'PERSISTENT',
//   },
//   alertTypes: {
//     SUCCESS: 'SUCCESS',
//     ERROR: 'ERROR',
//     INFO: 'INFO',
//     WARNING: 'WARNING',
//   },

export const initialStateAlertManager: AlertManagerState = {
  message: '',
  type: null,
  isVisible: false,
  hideIntervalId: null,
};

export const ALERT_MANAGER_KEY = 'alertManager';
