import { AlertTypes } from 'store/slices/alertManagerSlice/models';

export const alertTypesClasses = {
  [AlertTypes.DEFAULT]: 'default',
  [AlertTypes.SUCCESS]: 'success',
  [AlertTypes.WARNING]: 'warning',
  [AlertTypes.INFO]: 'info',
  [AlertTypes.ERROR]: 'error',
};

export default {};
