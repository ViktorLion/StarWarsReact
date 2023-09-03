import React, { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Define props interface for ModalProps
interface ModalProps {
  children: ReactNode; // Child elements to be displayed inside the modal
  isOpen: boolean; //
  title: string; //
  handleClose: () => void; // Function to handle modal close
}

// ModalProps component
export default function ModalProps(props: ModalProps) {
  return (
    <Dialog
        fullWidth
        open={props.isOpen} // Modal open state controlled by parent component
        onClose={props.handleClose} // Modal close handler passed from parent component
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {props.title} 
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        {props.children}
        </DialogContent>
      </Dialog>
  )
}
