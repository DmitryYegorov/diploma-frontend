import React from "react";
import { Divider, TableCell, Typography } from "@mui/material";
import { useStyles } from "./styled";

const ClassCell: React.FC = () => {
  const classes = useStyles();

  return (
    <TableCell className={classes.root} onClick={() => alert("Hello")}>
      <Typography variant="body2">Теория Цвета (ФИТ-10)</Typography>
      <Divider />
      <Typography> - </Typography>
    </TableCell>
  );
};

export default ClassCell;
