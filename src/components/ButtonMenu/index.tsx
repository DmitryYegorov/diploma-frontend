import React from "react";
import { Button } from "@mui/material";
import { useStyles } from "./styled";

const ButtonMenu: (props: {
  label: string;
  icon: React.ReactElement;
}) => JSX.Element = (props) => {
  const { label, icon } = props;

  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      variant={"outlined"}
      startIcon={icon}
      size={"large"}
    >
      {label}
    </Button>
  );
};

export default ButtonMenu;
