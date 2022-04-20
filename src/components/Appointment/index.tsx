import * as React from "react";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";

const Appointment: React.FC<Appointments.AppointmentProps> = (props) => {
  return (
    <Appointments.Appointment {...props}>
      {props.children}
    </Appointments.Appointment>
  );
};

export default Appointment;
