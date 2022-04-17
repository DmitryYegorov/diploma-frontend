import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { useAppSelector } from "../../hooks/redux";
import { useStyles } from "./styled";
import { useNavigate } from "react-router-dom";

const UserAuthPanel: React.FC = () => {
  const {
    data: { user },
  } = useAppSelector((state) => state.auth);
  const classes = useStyles();

  const userName = `${user.firstName} ${user.middleName} ${user.lastName}`;
  const navigate = useNavigate();

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
      <IconButton onClick={logout}>
        <LogoutIcon style={{ color: "white" }} />
      </IconButton>
    </Stack>
  );
};

export default UserAuthPanel;
