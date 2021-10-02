import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Delete } from '@material-ui/icons';

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

export default function DeleteButton(props: {deleteAction?: () => any}) {
  const {deleteAction} = props

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
//need to render the item for better confrirmation.
  return (
    <div>
      <Button style={{color: 'white', background:'red'}} onClick={handleOpen}>
        Delete <Delete />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          Are you sure you wish to permanantly delete this item? 
          <Button style={{color: 'white', background:'red'}} onClick={deleteAction}>
            Delete <Delete />
          </Button>
          <Button style={{color: 'grey', background:'red'}} onClick={handleOpen}>
            Cancel 
          </Button>
        </Box>
        
      </Modal>
    </div>
  );
}