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
  createdAt: Date;
};

const SubjectItem: React.FC<Props> = ({ key, name, createdAt, author }) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography className={classes.padding}>{name}</Typography>
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

export default SubjectItem;
