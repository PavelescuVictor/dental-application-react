import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/store';
import {
  selectAlertMessage,
  selectAlertType,
  selectIsAlertVisible,
} from 'store/slices/alertManagerSlice/alertManagerSelectors';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { alertTypesClasses } from './models';
import StyledGlobalAlertLoader from './GlobalAlertLoader.style';

const GlobalAlertLoader = () => {
  const dispatch = useAppDispatch();
  const isVisible = useSelector(selectIsAlertVisible);
  const alertMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);

  const handleOnClickEvent = (event: any) => {
    event.preventDefault();
    dispatch(alertManagerActions.setIsVisible(false));
  };

  const renderAlert = () => {
    if (!alertMessage) return <></>;
    return <p>{alertMessage}</p>;
  };

  if (!isVisible) return null;
  return (
    <StyledGlobalAlertLoader
      className={`${alertType ? alertTypesClasses[alertType] : alertTypesClasses.DEFAULT}`}
      onClick={handleOnClickEvent}
    >
      <FontAwesomeIcon className="hide-button" icon={faX} />
      {renderAlert()}
    </StyledGlobalAlertLoader>
  );
};

export default GlobalAlertLoader;
