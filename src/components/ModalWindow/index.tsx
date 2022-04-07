import { Paper, Modal, Typography } from "@mui/material";
import { useStyles } from "./styled";
import React from "react";

type Props = {
  open: boolean;
  setOpen: () => void;
  label?: string;
  children: JSX.Element;
};

const ModalWindow: React.FC<Props> = ({ open, setOpen, label, children }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={setOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper elevation={3} className={classes.root}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {label}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {children}
        </Typography>
      </Paper>
    </Modal>
  );
};

export default ModalWindow;
