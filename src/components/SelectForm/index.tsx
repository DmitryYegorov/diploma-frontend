import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Option {
  value: string;
  label: string;
}

type Props = {
  label: string;
  handleChange: (e: any) => void;
  options: Array<Option>;
  value?: string;
};

const SelectForm: React.FC<Props> = ({
  label,
  handleChange,
  options,
  value,
}) => {
  return (
    <FormControl fullWidth style={{ marginTop: 20 }}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        {...(value ? { value } : {})}
        onChange={handleChange}
        label={label}
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectForm;
