import React from "react";
import { Paper, Typography } from "@mui/material";
import moment from "moment";

import { useStyles } from "./styled";

type Props = {
  selectedDate: Date;
};

const ScheduleClassUpdateHistory: React.FC<Props> = ({ selectedDate }) => {
  const classes = useStyles();

  const startDate = moment(selectedDate).startOf("month").toDate();
  const endDate = moment(selectedDate).endOf("month").toDate();

  return (
    <Paper className={classes.padding}>
      <Typography variant="h5">История</Typography>
      <Typography variant="h6">
        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
      </Typography>
    </Paper>
  );
};

export default ScheduleClassUpdateHistory;
