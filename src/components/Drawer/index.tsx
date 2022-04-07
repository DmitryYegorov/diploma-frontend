import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Drawer,
  ListItemText,
  List,
  Divider,
  Tooltip,
  IconButton,
  ListItem,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { MENU_LINKS } from "./config";
import { useStyles } from "./styled";
import { useAppSelector } from "../../hooks/redux";

import i18n from "../../i18n";

type DrawerProps = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

const DrawerComponent: React.FC<DrawerProps> = ({
  open,
  toggle,
  close,
}: DrawerProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { t } = useTranslation(["common"], { i18n });

  const menu = [
    { key: "calendar", label: t("common:calendar"), tooltip: "calendar" },
    { key: "main", label: t("common:mainMenu"), tooltip: "main" },
    { key: "subject", label: t("common:subjectControl"), tooltip: "" },
    { key: "schedule", label: t("common:scheduleControl"), tooltip: "" },
  ];

  const {
    data: { user },
  } = useAppSelector((state) => state.auth);

  const handleNavigation = (key: string) => {
    const path = MENU_LINKS[key];

    if (!path) {
      console.error("No such route");
      return;
    }

    navigate(`../${path}`);
    toggle();
  };

  return (
    <Drawer anchor="left" variant="temporary" onClose={toggle} open={open}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={close}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List className={classes.list}>
        {menu.map(({ key, label, tooltip }) => {
          return (
            <ListItem
              alignItems="flex-start"
              onClick={() => handleNavigation(key)}
              button
              key={key}
            >
              <Tooltip title={tooltip}>
                <ListItemText className={classes.mainItem}>
                  {label}
                </ListItemText>
              </Tooltip>
            </ListItem>
          );
        })}
        <Divider />
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
