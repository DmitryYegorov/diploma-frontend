import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { Print as PrintIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchScheduleClassofDepartmentBySemesterIdAction } from "../../store/reducers/ScheduleClass/ActionCreators";
import { WeekDay } from "../../typings/enum";
import { fetchScheduleTimesAction } from "../../store/reducers/ScheduleTime/ActionCreators";
import { mapDateToTime } from "../../helpers";
import ClassCell from "./components/ClassCell";
import { useStyles } from "./styled";
import { useReactToPrint } from "react-to-print";

const WeekDaysMap: Record<any, any> = {
  [WeekDay.MONDAY]: "Понедельник",
  [WeekDay.TUESDAY]: "Вторник",
  [WeekDay.WEDNESDAY]: "Среда",
  [WeekDay.THURSDAY]: "Четверг",
  [WeekDay.FRIDAY]: "Пятница",
  [WeekDay.SATURDAY]: "Суббота",
};

const ScheduleDepartment: React.FC = () => {
  const { semesterId } = useParams();

  const classes = useStyles();
  const reportToPrint = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => reportToPrint.current,
  });

  const dispatch = useAppDispatch();
  const scheduleClasses = useAppSelector((state) => state.scheduleClasses);
  const scheduleTime = useAppSelector((state) => state.scheduleTime);

  useLayoutEffect(() => {
    if (!scheduleClasses.isLoading) {
      dispatch(
        fetchScheduleClassofDepartmentBySemesterIdAction(semesterId || "")
      );
      dispatch(fetchScheduleTimesAction());
    }
  }, [dispatch]);

  const teacherNameList = Object.keys(scheduleClasses.scheduleOfDepartment);

  return (
    <Stack spacing={1}>
      <Button startIcon={<PrintIcon />} onClick={handlePrint}>
        Печать
      </Button>

      <div ref={reportToPrint}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 50 }}>Дни недели</TableCell>
                <TableCell style={{ width: 100 }}>Часы</TableCell>
                {teacherNameList &&
                  teacherNameList.map((name: string) => (
                    <TableCell>{name}</TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(Object.keys(WeekDaysMap) as Array<unknown>).map((weekDay) => (
                <>
                  <TableRow>
                    <TableCell rowSpan={scheduleTime.total + 1}>
                      <Typography
                        variant="body1"
                        style={{ transform: "rotate(-90deg)" }}
                      >
                        {WeekDaysMap[weekDay as WeekDay]}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {scheduleTime.list.map((time) => (
                    <TableRow>
                      <TableCell>{`${mapDateToTime(
                        new Date(time.startTime)
                      )} - ${mapDateToTime(
                        new Date(time.endTime)
                      )}`}</TableCell>
                      {teacherNameList.map((name) => (
                        <ClassCell
                          classValue={
                            scheduleClasses.scheduleOfDepartment[name]?.[
                              weekDay as WeekDay
                            ]?.[time.id]
                          }
                        />
                      ))}
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </Stack>
  );
};

export default ScheduleDepartment;
