import React from "react";
import { ListItem, ListItemText } from "@mui/material";

type Props = {
  name: string;
};

const UserItemList: React.FC<Props> = ({ name }) => {
  return (
    <ListItem>
      <ListItemText>{name}</ListItemText>
    </ListItem>
  );
};

export default UserItemList;
