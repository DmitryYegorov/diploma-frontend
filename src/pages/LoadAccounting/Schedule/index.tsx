import React, { useLayoutEffect } from "react";
import {
  Container,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import { Create as CreateIcon, Add as AddIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchScheduleTimesAction } from "../../../store/reducers/ScheduleTime/ActionCreators";
import ClassCell from "./components/ClassCell";
import { useStyles } from "./styled";

const Schedule: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, total, isLoading, error } = useAppSelector(
    (state) => state.scheduleTime
  );
  const classes = useStyles();

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
            <Button variant="contained" startIcon={<AddIcon />}>
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
                  <TableCell>{`${item.startTime} - ${item.endTime}`}</TableCell>
                  <ClassCell />
                  <ClassCell />
                  <ClassCell />
                  <ClassCell />
                  <ClassCell />
                  <ClassCell />
                  <ClassCell />
                </TableRow>
              ))}
          </Table>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Schedule;
