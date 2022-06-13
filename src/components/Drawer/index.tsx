import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  ListItemIcon,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";

import { MENU_LINKS } from "./config";
import { useStyles } from "./styled";
import { useAppSelector } from "../../hooks/redux";

import i18n from "../../i18n";
import { UserRole } from "../../typings/enum";
import Logo from "../Logo";

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
  const {
    data: { user },
  } = useAppSelector((state) => state.auth);

  const menu = [
    {
      key: "calendar",
      label: t("common:calendar"),
      tooltip: "calendar",
      icon: <CalendarMonthIcon />,
    },
    { key: "main", label: t("common:mainMenu"), tooltip: "main" },
    { key: "schedule", label: t("common:scheduleControl"), tooltip: "" },
    { key: "otherLoad", label: t("common:otherLoad"), tooltip: "" },
    { key: "reports", label: t("common:studyLoading.label"), tooltip: "" },
    { key: "documents", label: t("common:documents"), tooltip: "" },
  ];

  if ([UserRole.ADMIN, UserRole.MANAGER].includes(user.role as UserRole)) {
    menu.push(
      { key: "academicYear", label: t("common:academicYear"), tooltip: "" },
      { key: "studentInfo", label: t("common:studentInfo"), tooltip: "" },
      { key: "usersList", label: t("common:usersList"), tooltip: "" },
      { key: "subject", label: t("common:subjectControl"), tooltip: "" }
    );
  }

  React.useEffect(() => {}, []);

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
        <Logo />
        <IconButton onClick={close}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List className={classes.list}>
        {menu.map(({ key, label, tooltip, icon }) => {
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
