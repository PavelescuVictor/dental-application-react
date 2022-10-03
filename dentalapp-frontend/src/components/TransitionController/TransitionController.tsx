import { useEffect, useState, useMemo, useRef } from 'react';
import { TransitionControllerProps, transitions, Transition } from './models';

const TransitionController = (props: TransitionControllerProps): JSX.Element => {
  const [isReadyToUnmount, setIsReadyToUnmount] = useState<boolean>(false);
  const transition = useMemo<Transition>(() => transitions[props.transitionType], []);
  const TransitionStyle = transitions[props.transitionType].transitionStyle;
  const transitionWrapperRef = useRef<HTMLDivElement>(null);

  console.log(TransitionStyle);

  useEffect(() => {
    console.log('TransitionController: Mount');

    setTimeout(() => {
      setIsReadyToUnmount(true);
    }, transitions[props.transitionType].minRenderDuration);

    return () => {
      console.log('TransitionController: Unmount');
    };
  }, []);

  const applyTransitionMount = () => {
    console.log('TransitionController: Apply Transition Mount:', props.transitionType);
    if (transitionWrapperRef.current) {
      transitionWrapperRef.current.classList.add('transition-mount');
      transitionWrapperRef.current.classList.remove('transition-unmount');
    }
  };

  const applyTransitionUnmount = () => {
    console.log('TransitionControlleR: Apply Transition Unmount:', props.transitionType);
    if (transitionWrapperRef.current) {
      transitionWrapperRef.current.classList.add('transition-unmount');
      transitionWrapperRef.current.classList.remove('transition-mount');
    }
  };

  const handleTransitionMount = () => {
    if (props.onTransitionMountStart) props.onTransitionMountStart();
    applyTransitionMount();
    setTimeout(() => {
      if (props.onTransitionMountEnd) props.onTransitionMountEnd();
    }, transitions[props.transitionType].mountTime);
  };

  const handleTransitionUnmount = () => {
    if (props.onTransitionUnmountStart) props.onTransitionUnmountStart();
    applyTransitionUnmount();
    setTimeout(() => {
      if (props.onTransitionUnmountEnd) props.onTransitionUnmountEnd();
      props.onReadyToUnmountChild();
    }, transitions[props.transitionType].unmountTime);
  };

  useEffect(() => {
    if (props.readyForTransitionStart) handleTransitionMount();
  }, [props.readyForTransitionStart]);

  useEffect(() => {
    console.log(props.readyToUnmountChild, isReadyToUnmount);
    if (props.readyToUnmountChild && isReadyToUnmount) handleTransitionUnmount();
  }, [props.readyToUnmountChild, isReadyToUnmount]);

  return (
    <TransitionStyle>
      <div className="transition-wrapper" ref={transitionWrapperRef}>
        {props.children}
      </div>
    </TransitionStyle>
  );
};

export default TransitionController;
