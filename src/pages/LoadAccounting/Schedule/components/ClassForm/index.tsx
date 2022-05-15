import * as React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Container,
  TextField,
  Autocomplete,
  Grid,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { useEffect, useState } from "react";
import { fetchSubjectsAction } from "../../../../../store/reducers/Subject/ActionCreators";
import { Save as SaveIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { fetchRoomsAction } from "../../../../../store/reducers/Room/ActionCreators";
import { ClassType, Week } from "../../../../../typings/enum";
import subject from "../../../../Subject";
import { fetchGroupsWithFacultiesAction } from "../../../../../store/reducers/Group/ActionCreators";
import { GroupWithFaculty } from "../../../../../models/Group";
import { setClassToSchedule } from "../../../../../http/schedule";
import { fetchScheduleClassesOfTeacherBySemesterId } from "../../../../../store/reducers/ScheduleClass/ActionCreators";
import DatePicker from "../../../../../components/DatePicker";
import { useTranslation } from "react-i18next";

import i18n from "../../../../../i18n";

type Props = {
  weekDay: number;
  scheduleTime: string;
};

const weekMapLabel = [
  {
    week: Week.WEEKLY,
    label: "Каждую неделю",
  },
  {
    week: Week.FIRST,
    label: "Первая неделя",
  },
  {
    week: Week.SECOND,
    label: "Вторая неделя",
  },
];

const classTypeMapLabel = [
  {
    type: ClassType.LAB,
    label: "Лабораторная работа",
  },
  {
    type: ClassType.LECTION,
    label: "Лекция",
  },
  {
    type: ClassType.PRACTICE_CLASS,
    label: "Практическое занятие",
  },
];

const CellForm: React.FC<Props> = ({ weekDay, scheduleTime }) => {
  const rootState = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const { t } = useTranslation(["common", "calendar"], { i18n });

  const [startDate, setStartDate] = useState<Date | string | null>(null);
  const [endDate, setEndDate] = useState<Date | string | null>(null);

  const { handleSubmit, setValue, register } = useForm<{
    subject: string;
    week: Week;
    room: string;
    type: ClassType;
    groups: Array<GroupWithFaculty>;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
  }>({
    defaultValues: {
      week: Week.FIRST,
      subject: "",
      room: "",
      type: ClassType.LAB,
      groups: [],
    },
  });

  useEffect(() => {
    if (!rootState.subject.isLoading && !rootState.room.isLoading) {
      Promise.all([
        dispatch(fetchSubjectsAction()),
        dispatch(fetchRoomsAction()),
        dispatch(fetchGroupsWithFacultiesAction()),
      ]);
    }
  }, [dispatch]);

  useEffect(() => {
    register("subject", { required: true });
    register("week", { required: true });
    register("room", { required: true });
    register("type", { required: true });
    register("groups", { required: true });
    register("startDate");
    register("endDate");
  }, [register]);

  const setClass = async (data: any) => {
    const roomId = rootState.room.list.find((r) => r.room === data.room)!.id;

    const request = {
      subjectId: data.subject,
      week: data.week,
      type: data.type,
      roomId,
      weekDay,
      scheduleTimeId: scheduleTime,
      groupIds: data.groups.map((g: GroupWithFaculty) => g.id),
      startDate: data.startDate,
      endDate: data.endDate,
      semesterId: rootState.semester.selectedSemester.id,
    };

    await setClassToSchedule(request);
    dispatch(
      fetchScheduleClassesOfTeacherBySemesterId(
        rootState.semester.selectedSemester.id
      )
    );
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="week">Неделя</InputLabel>
            <Select
              labelId="week"
              id="weekId"
              label="Неделя"
              onChange={(e) => setValue("week", e.target.value as Week)}
            >
              {weekMapLabel.map((w) => (
                <MenuItem value={w.week}>{w.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="subject">Дисциплина</InputLabel>
            <Select
              labelId="subject"
              label="Дисциплина"
              onChange={(e) => setValue("subject", e.target.value as string)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {rootState.subject.list &&
                rootState.subject.list.map((s) => (
                  <MenuItem value={s.id}>{s.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="classType">Тип занятия</InputLabel>
            <Select
              labelId="type"
              label="Type"
              onChange={(e) => setValue("type", e.target.value as ClassType)}
            >
              {classTypeMapLabel.map((c) => (
                <MenuItem value={c.type}>{c.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            disablePortal
            options={rootState.room.list.map((r) => r.room)}
            onChange={(e, options) => setValue("room", `${options}`)}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label={"Аудитория"} fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <DatePicker
            label={t("calendar:startDate")}
            onChange={(newValue) => {
              setValue("startDate", newValue);
              setStartDate(newValue);
            }}
            value={startDate}
          />
        </Grid>
        <Grid item xs={4}>
          <DatePicker
            label={t("calendar:endDate")}
            onChange={(newValue) => {
              setValue("endDate", newValue);
              setEndDate(newValue);
            }}
            value={endDate}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={rootState.group.list}
            getOptionLabel={(option) => option.label}
            fullWidth
            onChange={(event, newValue) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setValue("groups", newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Группы"
                placeholder="Favorites"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={handleSubmit(setClass)}
          >
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CellForm;
