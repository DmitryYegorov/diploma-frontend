import React from "react";
import { Button } from "@mui/material";
import { useStyles } from "./styled";

type Props = {
  label: string;
  icon: React.ReactElement;
  onClick: () => void;
};

const ButtonMenu: React.FC<Props> = (props) => {
  const { label, icon } = props;

  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      variant={"outlined"}
      startIcon={icon}
      size={"large"}
      onClick={props.onClick}
    >
      {label}
    </Button>
  );
};

export default ButtonMenu;
