import {
  ScrollTopTransition,
  NavbarTransition,
  LoaderTransition,
  AlertTransition,
} from './Transitions';

export type TransitionType = keyof typeof transitionTypes;

export interface Transition {
  transitionStyle: any;
  mountTransitionDuration: number;
  unmountTransitionDuration: number;
  minRenderDuration: number;
}

export const transitionTypes = {
  ALERT: 'ALERT',
  SCROLL_TOP: 'SCROLL_TOP',
  NAVBAR: 'NAVBAR',
  LOADER: 'LOADER',
} as const;

export type Transitions = {
  [key in TransitionType]: Transition;
};

export const transitions: Transitions = {
  [transitionTypes.ALERT]: {
    transitionStyle: AlertTransition,
    mountTransitionDuration: 0,
    unmountTransitionDuration: 0,
    minRenderDuration: 5000,
  },
  [transitionTypes.SCROLL_TOP]: {
    transitionStyle: ScrollTopTransition,
    mountTransitionDuration: 0,
    unmountTransitionDuration: 0,
    minRenderDuration: 5000,
  },
  [transitionTypes.NAVBAR]: {
    transitionStyle: NavbarTransition,
    mountTransitionDuration: 0,
    unmountTransitionDuration: 0,
    minRenderDuration: 5000,
  },
  [transitionTypes.LOADER]: {
    transitionStyle: LoaderTransition,
    mountTransitionDuration: 0,
    unmountTransitionDuration: 0,
    minRenderDuration: 5000,
  },
};

export interface TransitionControllerProps {
  className?: string;
  onTransitionMountStart?: () => void;
  onTransitionMountEnd?: () => void;
  onTransitionUnmountStart?: () => void;
  onTransitionUnmountEnd?: () => void;
  onReadyToUnmountChild: () => void;
  readyToUnmountChild: boolean;
  readyForTransitionStart: boolean;
  transitionType: TransitionType;
  children?: any;
}
export default {};
