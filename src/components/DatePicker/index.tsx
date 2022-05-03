import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

type Props = {
  label: string;
  onChange: (newValue: Date | null) => void;
  value: Date | string | null;
};

const DatePicker: React.FC<Props> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={props.label}
        inputFormat="dd/MM/yyyy"
        value={props.value}
        onChange={props.onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
