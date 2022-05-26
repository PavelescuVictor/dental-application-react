import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Box,
} from '@material-ui/core';
import { Button } from 'components';
import StyledConfirmationDialog from './ConfirmationDialog.style';

interface ConfirmationBoxProps {
  onConfirm: (event: any) => void;
  onCancel: (event: any) => void;
  isOpen: boolean;
  title: string;
  body: string;
  confirmLabel: string;
}

const ConfirmationBox = ({
  onConfirm,
  onCancel,
  isOpen,
  title,
  body,
  confirmLabel,
}: ConfirmationBoxProps): JSX.Element => {
  const handleConfirm = (event: any) => {
    if (onConfirm) onConfirm(event);
  };

  return (
    <StyledConfirmationDialog className="confirmation-dialog">
      <Dialog
        open={isOpen}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box px={6}>
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{body}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {onCancel && (
              <Button className="cancel-button" action={onCancel}>
                Cancel
              </Button>
            )}
            <Button className="confirm-button" action={handleConfirm}>
              {confirmLabel}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </StyledConfirmationDialog>
  );
};

export default ConfirmationBox;
