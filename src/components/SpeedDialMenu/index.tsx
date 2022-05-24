import React from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon, Box } from "@mui/material";

type ActionItem = {
  key: string;
  icon: any;
  tooltipTitle: string;
  handleClick: () => void;
};

type Props = {
  actions: Array<ActionItem>;
};

const SpeedDialMenu: React.FC<Props> = ({ actions }) => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.key}
          icon={action.icon}
          tooltipTitle={action.tooltipTitle}
          onClick={action.handleClick}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialMenu;
