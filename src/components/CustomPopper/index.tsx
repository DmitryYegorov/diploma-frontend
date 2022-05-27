import React from "react";
import {
  Box,
  Popper,
  PopperPlacementType,
  Fade,
  Paper,
  IconButton,
} from "@mui/material";
import { MoreHoriz as MoreHorizIcon } from "@mui/icons-material";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const CustomPopper: React.FC<Props> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <Box>
      <IconButton onClick={handleClick("bottom")}>
        <MoreHorizIcon />
      </IconButton>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{ padding: 5 }}>{children}</Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};
export default CustomPopper;
