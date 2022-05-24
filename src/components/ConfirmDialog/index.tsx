import React, { ReactElement } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

type Props = {
  title: string;
  contentText: string;
  handleAgree: () => void;
  handleClose: () => void;
  open: boolean;
  children?: ReactElement;
};

const ConfirmDialog: React.FC<Props> = ({
  handleAgree,
  open,
  contentText,
  title,
  handleClose,
  children,
}) => {
  const { t } = useTranslation(["common"], { i18n });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentText}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t("common:confirmDialog.disagree")}
          </Button>
          <Button
            onClick={() => {
              handleAgree();
              handleClose();
            }}
            autoFocus
          >
            {t("common:confirmDialog.agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
