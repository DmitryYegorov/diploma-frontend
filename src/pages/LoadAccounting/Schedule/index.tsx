import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add as AddIcon, Create as CreateIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchScheduleTimesAction } from "../../../store/reducers/ScheduleTime/ActionCreators";
import ClassCell from "./components/ClassCell";
import { useStyles } from "./styled";
import { useNavigate } from "react-router-dom";
import { mapDateToTime } from "../../../helpers";
import { WeekDay } from "../../../typings/enum";
import { getScheduleClassesForAuthenticatedTeacher } from "../../../http/schedule";
import { useAsync } from "react-use";
import { fetchScheduleClassForAuthTeacherAction } from "../../../store/reducers/ScheduleClass/ActionCreators";

const Schedule: React.FC = () => {
  const dispatch = useAppDispatch();
  const rootState = useAppSelector((state) => state);
  const classes = useStyles();
  const navigation = useNavigate();

  useLayoutEffect(() => {
    if (
      !rootState.scheduleTime.isLoading &&
      !rootState.scheduleClasses.isLoading
    ) {
      dispatch(fetchScheduleTimesAction());
      dispatch(fetchScheduleClassForAuthTeacherAction());
    }
  }, [dispatch]);

  return (
    <Container>
      <Stack spacing={3}>
        <Paper elevation={3} className={classes.root}>
          <Stack spacing={1} direction="row">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigation("create")}
            >
              Создать
            </Button>
            <Button variant="contained" startIcon={<CreateIcon />}>
              Редактировать
            </Button>
          </Stack>
        </Paper>

        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableCell align="center">Время</TableCell>
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
                <TableRow>
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
      </Stack>
    </Container>
  );
};

export default Schedule;
