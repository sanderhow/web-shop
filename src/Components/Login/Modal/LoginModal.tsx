import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Avatar, useMediaQuery } from "@mui/material";
import ModalTextArea from "./ModalTextArea";
import { useUser } from "../../../Contexts/Auth/UserData";
import { useNavigate } from "react-router-dom";
import * as P from "./parts";
import { translations } from "../../../utils/translations";

const styleModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  textAlign: "center",
  transform: "translate(-50%, -50%)",
  width: 850,
  bgcolor: "background.paper",
  border: "1px solid #9b9797",
  boxShadow: 24,
  p: 4,
};

const styleMobileModal = {
  position: "absolute" as "absolute",
  textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "1px solid #9b9797",
  boxShadow: 24,
  p: 2,
};

const LoginModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const { isAuth, setIsAuth, setUserItems } = useUser();
  const isTabletOrMobileScreen = useMediaQuery("(max-width:1000px)");

  const handleNavigate = () => {
    navigate(`/`);
    handleClose();
    setIsAuth(false);
    setUserItems(undefined);
  };

  return (
    <>
      <Button sx={{ minWidth: 0 }} onClick={handleOpen}>
        {isAuth ? (
          <Avatar
            src="user.jpg"
            sx={{
              width: 24,
              height: 24,
            }}
          />
        ) : (
          <Avatar
            src="/broken-image.jpg"
            sx={{
              width: 24,
              height: 24,
            }}
          />
        )}
      </Button>
      {isAuth ? (
        <P.ModalWrapper>
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
              <Box sx={isTabletOrMobileScreen ? styleMobileModal : styleModal}>
                <Button onClick={handleNavigate}>
                  {translations.loginModal.logOutText}
                </Button>
              </Box>
            </Fade>
          </Modal>
        </P.ModalWrapper>
      ) : (
        <Modal
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
            <Box sx={isTabletOrMobileScreen ? styleMobileModal : styleModal}>
              <ModalTextArea handleClose={handleClose} />
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default LoginModal;
