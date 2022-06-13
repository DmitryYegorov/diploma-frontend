import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  Button,
  Container,
  Paper,
  Stack,
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Collapse,
  CircularProgress,
  Box,
  Link,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchScheduleTimesAction } from "../../../store/reducers/ScheduleTime/ActionCreators";
import ClassCell from "./components/ClassCell";
import { useStyles } from "./styled";
import { useNavigate } from "react-router-dom";
import { mapDateToTime } from "../../../helpers";
import { WeekDay } from "../../../typings/enum";
import { fetchScheduleClassesOfTeacherBySemesterId } from "../../../store/reducers/ScheduleClass/ActionCreators";
import SelectForm from "../../../components/SelectForm";
import { useTranslation } from "react-i18next";

import i18n from "../../../i18n";
import {
  fetchSemesterAction,
  fetchSemestersAction,
} from "../../../store/reducers/Semester/ActionCreators";

const Schedule: React.FC = () => {
  const { t } = useTranslation(["common"], { i18n });
  const dispatch = useAppDispatch();
  const rootState = useAppSelector((state) => state);
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  const semesterOptions = rootState.semester.list.map((s) => ({
    label: s.name,
    value: s.id,
  }));

  useLayoutEffect(() => {
    dispatch(fetchSemestersAction());
    dispatch(fetchScheduleTimesAction());
    if (rootState.semester.selectedSemester.id) {
      dispatch(
        fetchScheduleClassesOfTeacherBySemesterId(
          rootState.semester.selectedSemester.id
        )
      );
    }
    setTimeout(() => setLoading(!loading), 3000);
  }, [dispatch, rootState.semester.selectedSemester.id]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3} className={classes.root}>
          <Stack spacing={1}>
            <Typography variant="h6">
              Моё расписание на текущий семестр
            </Typography>
            <Typography>
              <Link
                href={`/schedule/${rootState.semester.selectedSemester.id}`}
              >
                Расписание кафедры
              </Link>
            </Typography>

            <SelectForm
              label={t("common:semesterLabel")}
              handleChange={(e) => {
                dispatch(fetchSemesterAction(e.target.value as string));
              }}
              value={rootState.semester.selectedSemester.id}
              options={semesterOptions}
            />
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} style={{ overflowX: "scroll" }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableCell align="center" style={{ width: 70 }}>
                Время
              </TableCell>
              <TableCell align="center">Понедельник</TableCell>
              <TableCell align="center">Вторник</TableCell>
              <TableCell align="center">Среда</TableCell>
              <TableCell align="center">Четверг</TableCell>
              <TableCell align="center">Пятница</TableCell>
              <TableCell align="center">Суббота</TableCell>
              <TableCell align="center">Воскресенье</TableCell>
            </TableHead>

            {rootState.scheduleTime.list &&
              rootState.scheduleTime.list.map((item) => (
                <TableRow style={{ height: 200 }}>
                  <TableCell>{`${mapDateToTime(
                    new Date(item.startTime)
                  )} - ${mapDateToTime(new Date(item.endTime))}`}</TableCell>
                  <ClassCell
                    weekDay={WeekDay.MONDAY}
                    scheduleTimeId={item.id}
                    classValue={
                      rootState.scheduleClasses.list?.["1"]?.[item.id]
                    }
                  />
                  <ClassCell
                    weekDay={WeekDay.TUESDAY}
                    scheduleTimeId={item.id}
                    classValue={
                      rootState.scheduleClasses.list?.["2"]?.[item.id]
                    }
                  />
                  <ClassCell
                    weekDay={WeekDay.WEDNESDAY}
                    scheduleTimeId={item.id}
                    classValue={
                      rootState.scheduleClasses.list?.["3"]?.[item.id]
                    }
                  />
                  <ClassCell
                    weekDay={WeekDay.THURSDAY}
                    scheduleTimeId={item.id}
                    classValue={
                      rootState.scheduleClasses.list?.["4"]?.[item.id]
                    }
                  />
                  <ClassCell
                    weekDay={WeekDay.FRIDAY}
                    scheduleTimeId={item.id}
                    classValue={
                      rootState.scheduleClasses.list?.["5"]?.[item.id]
                    }
                  />
                  <ClassCell
                    weekDay={WeekDay.SATURDAY}
                    scheduleTimeId={item.id}
                    classValue={
                      rootState.scheduleClasses.list?.["6"]?.[item.id]
                    }
                  />
                  <ClassCell
                    weekDay={WeekDay.SUNDAY}
                    scheduleTimeId={item.id}
                    classValue={
                      rootState.scheduleClasses.list?.["0"]?.[item.id]
                    }
                  />
                </TableRow>
              ))}
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Schedule;
