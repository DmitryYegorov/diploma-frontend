import React from "react";
import {
  Divider,
  Paper,
  Typography,
  List,
  ListItemText,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import {
  Person as PersonIcon,
  Create as CreateIcon,
} from "@mui/icons-material";
import { useStyles } from "./styled";

type Props = {
  key: string;
  author: string;
  name: string;
  createdAt: string;
  onClick?: () => void;
};

const SubjectItem: React.FC<Props> = ({
  key,
  name,
  createdAt,
  author,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.root}>
      <Typography className={classes.name} component="div" onClick={onClick}>
        {name}
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton disabled>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>{author}</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton disabled>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText>{createdAt}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};

SubjectItem.defaultProps = {
  key: "none",
  author: "none",
  createdAt: "none",
  name: "none",
};

export default SubjectItem;
