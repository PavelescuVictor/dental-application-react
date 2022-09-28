export interface AlertManagerState {
  message: string;
  type: AlertTypes | null;
  isVisible: boolean;
  hideIntervalId: ReturnType<typeof setTimeout> | null;
}

export enum AlertTypes {
  DEFAULT = 'DEFAULT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARNING = 'WARNING',
}
