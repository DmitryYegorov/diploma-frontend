import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "../Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import UserAuthPanel from "../UserAuthPanel";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Logo from "../Logo";

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
          <Box sx={{ flexGrow: 1 }}>
            <Logo color={"white"} />
          </Box>
          <UserAuthPanel />
        </Toolbar>

        <Drawer open={drawerOpen} toggle={toggleDrawer} close={closeDrawer} />
      </AppBar>
    </Box>
  );
};

export default Header;
