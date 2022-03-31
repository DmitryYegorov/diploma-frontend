import React from "react";
import { TextField } from "@mui/material";

type Props = {
  label: string;
};

const TextInput: React.FC<Props> = (props) => {
  return <TextField variant={"outlined"} label={props.label} size={"small"} />;
};

export default TextInput;
