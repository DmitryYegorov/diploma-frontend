import React, { useEffect } from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import Calendar from "../../../components/Calendar";
import ScheduleClassUpdateHistory from "../../../components/ScheduleClassUpdateHistory";
import { Circle } from "@mui/icons-material";
import { useStyles } from "./styled";
import { useTranslation } from "react-i18next";

import i18n from "../../../i18n";
import { AppointmentMarkColors } from "../../../helpers";
import { ClassType } from "../../../typings/enum";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getPeriod } from "../../../store/reducers/Event/slice";

const CalendarPage: React.FC = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { selectedDate } = useAppSelector((state) => state.event);
  const { t } = useTranslation(["event"], { i18n });

  useEffect(() => {
    dispatch(getPeriod(selectedDate));
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.padding}>
          <Stack direction="row" spacing={3}>
            <Stack spacing={0.5} direction="row">
              <Circle style={{ color: AppointmentMarkColors[ClassType.LAB] }} />
              <Typography> {t("event:LAB")}</Typography>
            </Stack>
            <Stack spacing={0.5} direction="row">
              <Circle
                style={{ color: AppointmentMarkColors[ClassType.LECTION] }}
              />
              <Typography> {t("event:LECTION")}</Typography>
            </Stack>
            <Stack spacing={0.5} direction="row">
              <Circle
                style={{
                  color: AppointmentMarkColors[ClassType.PRACTICE_CLASS],
                }}
              />
              <Typography> {t("event:PRACTICE_CLASS")}</Typography>
            </Stack>
            <Stack spacing={0.5} direction="row">
              <Circle style={{ color: AppointmentMarkColors.SWAP }} />
              <Typography> {t("event:SWAP")}</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Calendar />
      </Grid>
      <Grid item xs={4}>
        <ScheduleClassUpdateHistory selectedDate={selectedDate} />
      </Grid>
    </Grid>
  );
};

export default CalendarPage;
