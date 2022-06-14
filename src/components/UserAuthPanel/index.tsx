import React, { useEffect } from "react";
import {
  Badge,
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Logout as LogoutIcon,
  Summarize as SummarizeIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useAppSelector } from "../../hooks/redux";
import { useStyles } from "./styled";
import { useNavigate } from "react-router-dom";
import DropDownMenu from "../DropDownMenu";
import { UserRole } from "../../typings/enum";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n";
import { useAsyncFn } from "react-use";
import { fetchUserNotifications } from "../../http/notifications";

const UserAuthPanel: React.FC = () => {
  const {
    data: { user },
  } = useAppSelector((state) => state.auth);

  const { t } = useTranslation(["common", "report"], { i18n });

  const userName = `${user.firstName} ${user.middleName} ${user.lastName}`;
  const navigate = useNavigate();

  const hasPermission = [UserRole.ADMIN, UserRole.MANAGER].includes(user.role);

  const isDesktop = useMediaQuery("(min-width: 680px)");

  const adminItems = [
    {
      key: "total-report",
      text: t("report:totalReport.label"),
      icon: () => <AssignmentTurnedInIcon />,
      handleClick: () => navigate("/load-accounting/total-report"),
    },
    {
      key: "report-sent",
      text: t("report:sentReportsLabel"),
      icon: () => <SummarizeIcon />,
      handleClick: () => navigate("/load-accounting/reports/sent/list"),
    },
  ];

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("userData");

    navigate("/auth/login");
  };

  const [notifications, fetchNotifications] = useAsyncFn(async () => {
    const res = await fetchUserNotifications({ readed: false });

    return res.data;
  });

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant={isDesktop ? "h6" : "body2"} component="div">
        {userName}
      </Typography>
      <IconButton style={{ color: "#ffffff" }}>
        <Badge
          badgeContent={
            notifications?.value ? notifications.value.length : null
          }
          color={"error"}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <DropDownMenu
        options={[
          ...(hasPermission ? adminItems : []),
          {
            key: user.id,
            text: t("common:logout"),
            icon: () => <LogoutIcon />,
            handleClick: () => logout(),
          },
        ]}
      />
    </div>
  );
};

export default UserAuthPanel;
