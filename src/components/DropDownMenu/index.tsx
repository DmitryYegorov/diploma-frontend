import React from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { alpha, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

type OptionItem = {
  key: number | string;
  handleClick: () => void;
  icon?: React.FC;
  text: string;
};

type Props = {
  itemHeight?: number;
  options: Array<OptionItem>;
  label?: string | null;
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const DropDownMenu: React.FC<Props> = ({ itemHeight, label, options }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {!label ? (
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          style={{ color: "#ffffff" }}
        >
          <MoreVertIcon />
        </IconButton>
      ) : (
        <Button variant={"text"} onClick={handleClick}>
          {label}
        </Button>
      )}
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: itemHeight * 4.5,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.key}
            onClick={() => {
              handleClose();
              option.handleClick();
            }}
          >
            {option.icon && <ListItemIcon>{<option.icon />}</ListItemIcon>}
            <ListItemText>{option.text}</ListItemText>
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

DropDownMenu.defaultProps = {
  itemHeight: 48,
  label: null,
};

export default DropDownMenu;
