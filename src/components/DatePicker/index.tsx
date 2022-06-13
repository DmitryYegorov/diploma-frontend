import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import ruLocale from "date-fns/locale/ru";

type Props = {
  label: string;
  onChange: (newValue: Date | null) => void;
  value: Date | string | null;
  views?: Array<"year" | "month">;
  minDate?: Date;
  maxDate?: Date;
};

const DatePicker: React.FC<Props> = (props) => {
  return (
    <div style={{ minWidth: 150 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <DesktopDatePicker
          label={props.label}
          value={props.value}
          onChange={props.onChange}
          {...(props.views ? { views: props.views } : {})}
          {...(props.minDate ? { minDate: props.minDate } : {})}
          {...(props.maxDate ? { maxDate: props.maxDate } : {})}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;
