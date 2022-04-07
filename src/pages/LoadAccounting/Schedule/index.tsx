import React, { useLayoutEffect } from "react";
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

const Schedule: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, total, isLoading, error } = useAppSelector(
    (state) => state.scheduleTime
  );
  const classes = useStyles();
  const navigation = useNavigate();

  useLayoutEffect(() => {
    if (!isLoading) {
      dispatch(fetchScheduleTimesAction());
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
              <TableCell>Время</TableCell>
              <TableCell>Понедельник</TableCell>
              <TableCell>Вторник</TableCell>
              <TableCell>Среда</TableCell>
              <TableCell>Четверг</TableCell>
              <TableCell>Пятница</TableCell>
              <TableCell>Суббота</TableCell>
              <TableCell>Воскресенье</TableCell>
            </TableHead>
            {list &&
              list.map((item) => (
                <TableRow>
                  <TableCell>{`${mapDateToTime(
                    new Date(item.startTime)
                  )} - ${mapDateToTime(new Date(item.endTime))}`}</TableCell>
                  <ClassCell weekDay={WeekDay.MONDAY} />
                  <ClassCell weekDay={WeekDay.TUESDAY} />
                  <ClassCell weekDay={WeekDay.WEDNESDAY} />
                  <ClassCell weekDay={WeekDay.THURSDAY} />
                  <ClassCell weekDay={WeekDay.FRIDAY} />
                  <ClassCell weekDay={WeekDay.SATURDAY} />
                  <ClassCell weekDay={WeekDay.SUNDAY} />
                </TableRow>
              ))}
          </Table>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Schedule;
