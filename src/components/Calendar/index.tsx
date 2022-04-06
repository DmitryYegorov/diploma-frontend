import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

type Props = {
  appointments: { title: string; startDate: Date; endDate: Date }[];
};

const Calendar: React.FC<Props> = ({ appointments }) => {
  return (
    <Paper>
      <Scheduler data={appointments}>
        <ViewState currentDate={new Date()} />
        <MonthView />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default Calendar;
