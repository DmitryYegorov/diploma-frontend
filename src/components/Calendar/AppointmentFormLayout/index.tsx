import React, { useState } from "react";
import { Box, Paper, Stack, TextField } from "@mui/material";
import { useStyles } from "./styled";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import SelectForm from "../../SelectForm";
import { EventType } from "../../../typings/enum";
import { types } from "../../../helpers";

const AppointmentFormLayout: React.FC<AppointmentForm.BasicLayoutProps> = (
  props
) => {
  const [test, setTest] = useState("");

  const { appointmentData } = props;

  return (
    <AppointmentForm.BasicLayout {...props}>
      <SelectForm
        label="Тип события"
        handleChange={(e) =>
          props.onFieldChange({ type: e.target.value as EventType })
        }
        value={props.appointmentData.type as EventType}
        options={types}
      />
    </AppointmentForm.BasicLayout>
  );
};

export default AppointmentFormLayout;
