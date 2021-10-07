import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Delete } from '@material-ui/icons';
import { Grid } from '@mui/material';

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

  const handleDelete = () => {
    if (deleteAction) {deleteAction()}
    handleClose()
  }
//need to render the item for better confrirmation.
  return (
    <div>
      <Button fullWidth style={{color: 'white', background:'red'}} onClick={handleOpen}>
        Delete <Delete />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          Are you sure you wish to permanantly delete this item? 
          <Grid container spacing={2} style={{marginBlock: 2}}>
            <Grid item xs={6} >
              <Button fullWidth style={{color: 'white', background:'red'}} onClick={handleDelete}>
                Delete <Delete />
              </Button>
            </Grid>
            <Grid item xs={6} >
              <Button fullWidth style={{color: 'white', background:'grey'}} onClick={handleClose}>
                Cancel 
              </Button>
            </Grid>
          </Grid>
          
        </Box>
        
      </Modal>
    </div>
  );
}
