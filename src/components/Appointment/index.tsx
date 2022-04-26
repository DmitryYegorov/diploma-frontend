import * as React from "react";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { AppointmentMarkColors } from "../../helpers";

const Appointment: React.FC<Appointments.AppointmentProps> = (props) => {
  return (
    <Appointments.Appointment
      {...props}
      style={{
        background: AppointmentMarkColors[props.data.type],
      }}
    >
      {props.children}
    </Appointments.Appointment>
  );
};

export default Appointment;
