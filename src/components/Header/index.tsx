import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useStyles } from "./styled";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Header: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation(["common"], { i18n });

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          {t("common:eDepartment")}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
