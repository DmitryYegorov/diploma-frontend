import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { useStyles } from "./styled";

const UserAuthPanel: React.FC = () => {
  const {
    data: { user },
  } = useAppSelector((state) => state.auth);
  const classes = useStyles();

  const userName = `${user.firstName} ${user.middleName} ${user.lastName}`;

  return (
    <Box>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {userName}
      </Typography>
    </Box>
  );
};

export default UserAuthPanel;
