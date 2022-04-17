import React from "react";
import { TextField, Autocomplete } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

type Props = {
  options: Array<any>;
  label: string;
  keyLabel?: string;
};

const SelectAutoComplete: React.FC<Props> = ({ options, label, keyLabel }) => {
  const mappedOptions = keyLabel
    ? // eslint-disable-next-line @typescript-eslint/no-shadow
      options.map((item) => item[keyLabel])
    : options;

  return (
    <Autocomplete
      disablePortal
      options={mappedOptions}
      renderInput={(params) => (
        <TextField {...params} label={label} value={"wjqojqo"} />
      )}
    />
  );
};

export default SelectAutoComplete;
