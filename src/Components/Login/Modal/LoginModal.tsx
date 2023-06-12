import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import ModalTextArea from './ModalTextArea';
import { useUser } from '../../../Contexts/Auth/UserData';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 850,
  bgcolor: 'background.paper',
  border: '1px solid #9b9797',
  boxShadow: 24,
  p: 4,
};

const LoginModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isAuth } = useUser();

  return (
    <div>
      <Button onClick={handleOpen}>
          { <Avatar 
            src="/broken-image.jpg" 
            sx={{
              width: 24, 
              height: 24
          }}
          />}
      </Button>
      {isAuth ?
          <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Button onClick={handleOpen}>
                Wyloguj
              </Button>
          
            </Box>
          </Fade>
        </Modal> 
      :
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              {/* <Typography id="transition-modal-title" variant="h6" component="h2"> */}
                <ModalTextArea
                  handleClose = {handleClose}
                />
              {/* </Typography> */}
          
            </Box>
          </Fade>
        </Modal>
    }
    </div>
  );
}

export default LoginModal;