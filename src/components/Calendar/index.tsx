import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  ChangeSet,
  EditingState,
  IntegratedEditing,
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
  EditRecurrenceMenu,
  ConfirmationDialog,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useState } from "react";
import { useStyles } from "./styled";
import AppointmentFormLayout from "./AppointmentFormLayout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addNewEvent, removeEvent, updateEvent } from "../../http/event";
import { fetchAllEventsAction } from "../../store/reducers/Event/ActionCreators";

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
      onDoubleClick={
        props.data.isScheduleClass ? undefined : props.onDoubleClick
      }
    >
      {props.children}
    </Appointments.Appointment>
  );
};

const Calendar: React.FC<Props> = ({ appointments }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { addedAppointment, editingAppointment, appointmentChanges, list } =
    useAppSelector((state) => state.event);

  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const commitChanges = async (data: ChangeSet, appointmentsList) => {
    const { added, changed, deleted } = data;

    if (added) {
      const res = await addNewEvent(added);

      // eslint-disable-next-line no-console
      console.log("ADDED", res.data);
    }
    if (changed) {
      const eventId = Object.keys(changed)[0];
      const changedData = changed[eventId];
      const appointment = appointmentsList.find(
        (app: any) => app.id === eventId
      );
      const res = await updateEvent(changedData, eventId);

      // eslint-disable-next-line no-console
      console.log("CHANGED", res.data);
    }
    if (deleted) {
      await removeEvent(deleted);
    }
    dispatch(fetchAllEventsAction());
  };

  return (
    <Paper>
      <Scheduler data={list} locale="ru-RU">
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={(date) => setCurrentDate(date)}
        />
        <EditingState
          onCommitChanges={(data) => commitChanges(data, appointments)}
        />
        <EditRecurrenceMenu />
        <MonthView />
        <WeekView startDayHour={8} endDayHour={21} />
        <DayView startDayHour={8} endDayHour={21} />

        <AllDayPanel />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />

        <Appointments appointmentComponent={Appointment} />
        <AppointmentTooltip showOpenButton showDeleteButton showCloseButton />
        <AppointmentForm basicLayoutComponent={AppointmentFormLayout} />
      </Scheduler>
    </Paper>
  );
};

export default Calendar;
