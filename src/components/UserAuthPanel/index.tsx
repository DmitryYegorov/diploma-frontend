import React from "react";
import { Stack, Typography } from "@mui/material";
import {
  Logout as LogoutIcon,
  Summarize as SummarizeIcon,
} from "@mui/icons-material";
import { useAppSelector } from "../../hooks/redux";
import { useStyles } from "./styled";
import { useNavigate } from "react-router-dom";
import DropDownMenu from "../DropDownMenu";
import { UserRole } from "../../typings/enum";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n";

const UserAuthPanel: React.FC = () => {
  const {
    data: { user },
  } = useAppSelector((state) => state.auth);
  const classes = useStyles();

  const { t } = useTranslation(["common", "report"], { i18n });

  const userName = `${user.firstName} ${user.middleName} ${user.lastName}`;
  const navigate = useNavigate();

  const hasPermission = [UserRole.ADMIN, UserRole.MANAGER].includes(user.role);

  const adminItems = [
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

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {userName}
      </Typography>
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
    </Stack>
  );
};

export default UserAuthPanel;
