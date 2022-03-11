export interface AlertManagerState {
  message: string;
  type: AlertTypes | null;
  isVisible: boolean;
}

export enum AlertTypes {
  DEFAULT = 'DEFAULT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARNING = 'WARNING',
}
