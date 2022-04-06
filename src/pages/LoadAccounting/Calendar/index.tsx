import React from "react";
import { Grid } from "@mui/material";
import Calendar from "../../../components/Calendar";
import Sidebar from "./Sidebar";

const CalendarPage: React.FC = () => {
  const appointments = [
    {
      title: "Website Re-Design Plan",
      startDate: new Date(2018, 6, 23, 9, 30),
      endDate: new Date(2018, 6, 23, 11, 30),
    },
    {
      title: "Book Flights to San Fran for Sales Trip",
      startDate: new Date(2018, 6, 23, 12, 0),
      endDate: new Date(2018, 6, 23, 13, 0),
    },
    {
      title: "Install New Router in Dev Room",
      startDate: new Date(2018, 6, 23, 14, 30),
      endDate: new Date(2018, 6, 23, 15, 30),
    },
    {
      title: "Approve Personal Computer Upgrade Plan",
      startDate: new Date(2018, 6, 24, 10, 0),
      endDate: new Date(2018, 6, 24, 11, 0),
    },
  ];

  return (
    <Grid container>
      <Grid item xs={8}>
        <Calendar appointments={appointments} />
      </Grid>
      <Grid item xs={4} spacing={3}>
        <Sidebar />
      </Grid>
    </Grid>
  );
};

export default CalendarPage;
