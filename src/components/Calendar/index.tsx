import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  ChangeSet,
  EditingState,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Appointments,
  DateNavigator,
  Toolbar,
  TodayButton,
  ViewSwitcher,
  DayView,
  WeekView,
  AppointmentTooltip,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useState } from "react";
import { useStyles } from "./styled";

type Props = {
  appointments: { title: string; startDate: Date; endDate: Date }[];
};

const Appointment: React.FC<Appointments.AppointmentProps> = (props) => {
  return (
    <Appointments.Appointment
      {...props}
      style={
        props.data.isScheduleClass
          ? {
              backgroundColor: "#1976D2",
            }
          : {}
      }
      onClick={props.data.isScheduleClass ? undefined : props.onClick}
    >
      {props.children}
    </Appointments.Appointment>
  );
};

const Calendar: React.FC<Props> = ({ appointments }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const classes = useStyles();

  const commitChanges = (data: ChangeSet) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Paper>
      <Scheduler data={appointments} locale="ru-RU">
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={(date) => setCurrentDate(date)}
        />
        <EditingState onCommitChanges={(e) => commitChanges(e)} />
        <MonthView />
        <WeekView startDayHour={8} endDayHour={21} />
        <DayView startDayHour={8} endDayHour={21} />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />
        <Appointments appointmentComponent={Appointment} />
        <AppointmentTooltip showCloseButton showOpenButton />
        <AppointmentForm />
      </Scheduler>
    </Paper>
  );
};

export default Calendar;
