import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "../Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import UserAuthPanel from "../UserAuthPanel";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslation(["common"], { i18n });

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t("common:eDepartment")}
          </Typography>
          <UserAuthPanel />
        </Toolbar>

        <Drawer open={drawerOpen} toggle={toggleDrawer} close={closeDrawer} />
      </AppBar>
    </Box>
  );
};

export default Header;
