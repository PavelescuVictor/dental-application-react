import { useEffect, useState, useCallback } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import StyledLoader from './Loader.style';

const Loader = () => {
  useEffect(() => {
    console.log('Child: Mount');

    return () => {
      console.log('Child: Unmount');
    };
  }, []);

  return (
    <StyledLoader>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </StyledLoader>
  );
};

// const Parent = (): JSX.Element => {
//   const [shouldRenderChild, setShouldRenderChild] = useState<boolean>(true);
//   const [readyToUnmountChild, setReadyToUnmountChild] = useState<boolean>(false);
//   const [readyForTransitionStart, setReadyForTranasitionStart] = useState<boolean>(false);
//   const transitionType = transitionTypes.LOADER;

//   useEffect(() => {
//     console.log('Parent: Mount');
//     setReadyForTranasitionStart(true);

//     console.log('Parent: Schedule Unmounting In: ', 10000);
//     setTimeout(() => {
//       console.log('Parent: Ready To Unmount');
//       setReadyToUnmountChild(true);
//     }, 10000);
//   }, []);

//   const onTransitionMountStart = useCallback(() => {
//     console.log('Parent: On Transition Mount Start Callback');
//   }, []);

//   const onTransitionMountEnd = useCallback(() => {
//     console.log('Parent: On Transition Mount End Callback');
//   }, []);

//   const onTransitionUnmountStart = useCallback(() => {
//     console.log('Parent: On Transition Unmount Start Callback');
//   }, []);

//   const onTransitionUnmountEnd = useCallback(() => {
//     console.log('Parent: On Transition Unmount End Callback');
//   }, []);

//   const onReadyToUnmountChild = useCallback(() => {
//     console.log('Parent: On Ready To Unmount Child');
//     setShouldRenderChild(false);
//   }, []);

//   return (
//     <>
//       {shouldRenderChild ? (
//         <TransitionController
//           onTransitionMountStart={onTransitionMountStart}
//           onTransitionMountEnd={onTransitionMountEnd}
//           onTransitionUnmountStart={onTransitionUnmountStart}
//           onTransitionUnmountEnd={onTransitionUnmountEnd}
//           onReadyToUnmountChild={onReadyToUnmountChild}
//           readyToUnmountChild={readyToUnmountChild}
//           readyForTransitionStart={readyForTransitionStart}
//           transitionType={transitionType}
//         >
//           <Loader />
//         </TransitionController>
//       ) : null}
//     </>
//   );
// };

export default Loader;
