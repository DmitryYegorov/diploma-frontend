import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  type?: "text" | "password";
  control: any;
};

const FormInputText: React.FC<Props> = (props) => {
  return (
    <Controller
      control={props.control}
      render={({ field: { onChange, value } }) => (
        <TextField
          variant={"outlined"}
          label={props.label}
          size={"small"}
          onChange={onChange}
          value={value}
          type={props.type}
        />
      )}
      name={props.name}
    />
  );
};

export default FormInputText;
