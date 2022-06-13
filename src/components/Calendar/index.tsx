import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
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
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useState } from "react";
import CustomAppointmentForm from "../AppointmentFormLayout";
import Appointment from "../Appointment";
import AppointmentTooltipLayout from "../AppointmentTooltip";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAllClassesAction } from "../../store/reducers/Event/ActionCreators";
import { getPeriod } from "../../store/reducers/Event/slice";
import { useMediaQuery } from "@mui/material";

const TimeTableCell: React.FC<MonthView.TimeTableCellProps> = (props) => (
  <MonthView.TimeTableCell {...props} onDoubleClick={() => undefined} />
);

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { list } = useAppSelector((state) => state.event);

  const isDesktop = useMediaQuery("(min-width: 680px)");

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchAllClassesAction());
  }, [dispatch]);

  return (
    <Paper>
      <Scheduler data={list} locale="ru-RU">
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={(date) => {
            dispatch(getPeriod(date));
            setCurrentDate(date);
          }}
        />
        {!isDesktop ? <DayView startDayHour={8} endDayHour={21} /> : null}
        <MonthView timeTableCellComponent={TimeTableCell} />
        <WeekView startDayHour={8} endDayHour={21} />
        {isDesktop ? <DayView startDayHour={8} endDayHour={21} /> : null}

        <AllDayPanel />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />

        <Appointments appointmentComponent={Appointment} />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
          layoutComponent={AppointmentTooltipLayout}
        />
        <CustomAppointmentForm />
      </Scheduler>
    </Paper>
  );
};

export default Calendar;
