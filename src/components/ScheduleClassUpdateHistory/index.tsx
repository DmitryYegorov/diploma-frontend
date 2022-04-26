import React, { useCallback, useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import moment from "moment";
import { useStyles } from "./styled";
import { getUpdatesLogs } from "../../http/schedule";
import { useAsyncFn } from "react-use";
import Item from "./Item";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getPeriod } from "../../store/reducers/Event/slice";
import { fetchUpdateLogsAction } from "../../store/reducers/Event/ActionCreators";

type Props = {
  selectedDate: Date;
};

const ScheduleClassUpdateHistory: React.FC<Props> = ({ selectedDate }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { updateLogs } = useAppSelector((state) => state.event);

  const startDate = moment(selectedDate).startOf("month").toDate();
  const endDate = moment(selectedDate).endOf("month").toDate();

  useEffect(() => {
    dispatch(fetchUpdateLogsAction(startDate, endDate));
  }, [dispatch, selectedDate]);

  return (
    <Paper className={classes.padding}>
      <Typography variant="h5">История</Typography>
      <Typography variant="h6">
        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
      </Typography>
      {!!updateLogs.length &&
        updateLogs.map((item: any) => (
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
