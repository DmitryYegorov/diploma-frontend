import React, { useCallback, useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import moment from "moment";
import { useStyles } from "./styled";
import { getUpdatesLogs } from "../../http/schedule";
import { useAsyncFn } from "react-use";
import Item from "./Item";

type Props = {
  selectedDate: Date;
};

const ScheduleClassUpdateHistory: React.FC<Props> = ({ selectedDate }) => {
  const classes = useStyles();

  const [log, setLog] = useState([]);

  const startDate = moment(selectedDate).startOf("month").toDate();
  const endDate = moment(selectedDate).endOf("month").toDate();

  const [{ value, loading }, fetchLogs] = useAsyncFn(async () => {
    const res = await getUpdatesLogs(startDate, endDate);
    return res.data;
  }, [startDate, endDate]);

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <Paper className={classes.padding}>
      <Typography variant="h5">История</Typography>
      <Typography variant="h6">
        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
      </Typography>
      {!loading &&
        value &&
        value.map((item: any) => (
          <Item
            type={item.type}
            scheduleClass={item.scheduleClass}
            classDate={item.classDate}
            reason={item.reason}
            teacher={item.teacher}
            newTeacher={item.newTeacher}
            rescheduleDate={item.rescheduleDate}
          />
        ))}
    </Paper>
  );
};

export default ScheduleClassUpdateHistory;
