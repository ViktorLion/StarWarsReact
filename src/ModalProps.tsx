import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { ReactNode } from 'react';

// Define props interface for ModalProps
interface ModalProps {
  children: ReactNode; // Child elements to be displayed inside the modal
  isOpen: boolean; //
  title: string; //
  handleClose: () => void; // Function to handle modal close
}

// Style configuration for the modal
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// ModalProps component
export default function ModalProps(props: ModalProps) {
  const [open, setOpen] = React.useState(false);
  
  

  return (
    <Modal
      open={props.isOpen} // Modal open state controlled by parent component
      onClose={props.handleClose} // Modal close handler passed from parent component
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.title} {/* Modal title */}
        </Typography>
        {props.children} {/* Display the child elements within the modal */}
      </Box>
    </Modal>
  );
}
