import React from "react";
import {
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface Option {
  value: string;
  label: string;
}

type Props = {
  label: string;
  handleChange: (e: any) => void;
  options: Array<Option> | null;
  value?: any;
  loading?: boolean;
  width?: number;
  fullWidth?: boolean;
  disabled?: boolean;
};

const SelectForm: React.FC<Props> = ({
  label,
  handleChange,
  options,
  value,
  loading,
  width,
  fullWidth,
  disabled,
}) => {
  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id="select-label">{label}</InputLabel>
      {options && (
        <Select
          {...(value ? { defaultValue: value } : {})}
          onChange={handleChange}
          label={label}
          style={{ width }}
          disabled={disabled}
        >
          {options.map((option) => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

SelectForm.defaultProps = {
  loading: false,
  fullWidth: true,
  disabled: false,
};

export default SelectForm;
