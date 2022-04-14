import React from "react";
import { Box, Paper, Stack } from "@mui/material";
import { useStyles } from "./styled";

const Sidebar: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.padding}>
      <Stack spacing={3}>
        <h1>Sidebar</h1>
        <h1>Sidebar</h1>
        <h1>Sidebar</h1>
        <h1>Sidebar</h1>
        <h1>Sidebar</h1>
      </Stack>
    </Paper>
  );
};

export default Sidebar;
