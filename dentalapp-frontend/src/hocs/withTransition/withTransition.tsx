import { useEffect, ElementType, useRef, cloneElement, Children, LegacyRef } from 'react';
import { StyledScrollTopTransition, StyledNavbarTransition } from './transitionts';

export const transitionTypes = {
  ALERT: 'ALERT',
  SCROLL_TOP: 'SCROLL_TOP',
  NAVBAR: 'NAVBAR',
};

type TransitionType = keyof typeof transitionTypes;

interface Transitions {
  [key: TransitionType]: {
    transitionStyle: JSX.Element;
    transitionTime: number;
  };
}

export const transitions: Transitions = {
  [transitionTypes.ALERT]: {
    transitionStyle: StyledScrollTopTransition,
    transitionTime: 10000,
  },
  [transitionTypes.SCROLL_TOP]: {
    transitionStyle: StyledScrollTopTransition,
    transitionTime: 10000,
  },
  [transitionTypes.NAVBAR]: {
    transitionStyle: StyledNavbarTransition,
    transitionTime: 10000,
  },
};

interface TransitionControllerProps {
  type: TransitionType;
  children: any;
}

const TransitionController = ({ type, children }: TransitionControllerProps): JSX.Element => {
  const TransitionStyle = transitions[type].transitionStyle;
  const transitionWrapperRef = useRef(null);

  const onMountTransition = () => {
    transitionWrapperRef.current.classList.add('transition-start');
    transitionWrapperRef.current.classList.remove('transition-end');
  };

  const onUnmountTransition = () => {
    transitionWrapperRef.current.classList.remove('transition-start');
    transitionWrapperRef.current.classList.add('transition-end');
  };

  const handleMountedChild = () => {
    onMountTransition();
  };
  const handleUnmountedChild = () => {
    onUnmountTransition();
  };

  return (
    <TransitionStyle>
      <div className="transition-wrapper" ref={transitionWrapperRef}>
        {cloneElement(children, {
          mountedCallback: handleMountedChild,
          unmountedCallback: handleUnmountedChild,
        })}
      </div>
    </TransitionStyle>
  );
};

// const TransitionWrapper = (props: Record<string, unknown>): JSX.Element => {
//   const onMountHandler = () => {};

//   const onUnmountHandler = () => {};

//   useEffect(() => {
//     onMountHandler();
//     return () => {
//       onUnmountHandler();
//     };
//   }, []);
//   return <div className="transition-wrapper">{props.children}</div>;
// };

export const withTransition = (transitionType: TransitionType, Component: ElementType) => {
  const RenderComponent = (props: Record<string, unknown>): JSX.Element => (
    <TransitionController type={transitionType}>
      {/* <TransitionWrapper> */}
      <Component {...props} />
      {/* </TransitionWrapper> */}
    </TransitionController>
  );

  return RenderComponent;
};

export default withTransition;
