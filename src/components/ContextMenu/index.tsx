import * as React from "react";
import { Menu, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import { useStyles } from "./styled";

export type Option = {
  handleClick: (data: any) => void;
  text: string;
  icon?: React.FC;
  color?: string;
};

type Props = {
  children?: any;
  options: Array<Option>;
  itemData: any;
};

const ContextMenu: React.FC<Props> = ({ children, options, itemData }) => {
  const classes = useStyles();

  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <div onContextMenu={handleContextMenu} className={classes.root}>
      {children}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {options.map((o) => (
          <MenuItem
            onClick={() => {
              handleClose();
              o.handleClick(itemData);
            }}
            color="error"
          >
            <ListItemIcon>{<o.icon />}</ListItemIcon>
            <ListItemText>{o.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ContextMenu;
