import * as React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Stack,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { useEffect, useState } from "react";
import { fetchSubjectsAction } from "../../../../../store/reducers/Subject/ActionCreators";
import { Save as SaveIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { fetchRoomsAction } from "../../../../../store/reducers/Room/ActionCreators";
import { Room } from "../../../../../models/Room";
import { ClassType, Week } from "../../../../../typings/enum";
import subject from "../../../../Subject";
import { fetchGroupsWithFacultiesAction } from "../../../../../store/reducers/Group/ActionCreators";
import { GroupWithFaculty } from "../../../../../models/Group";
import { setClassToSchedule } from "../../../../../http/schedule";
import { fetchScheduleClassForAuthTeacherAction } from "../../../../../store/reducers/ScheduleClass/ActionCreators";

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
    type: ClassType.LAB,
    label: "Практическое занятие",
  },
];

const CellForm: React.FC<Props> = ({ weekDay, scheduleTime }) => {
  const rootState = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [weekly, setWeekly] = useState(false);

  const { handleSubmit, setValue, register } = useForm<{
    subject: string;
    week: Week;
    room: string;
    type: ClassType;
    groups: Array<GroupWithFaculty>;
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
    };

    await setClassToSchedule([request]);
    dispatch(fetchScheduleClassForAuthTeacherAction());
  };

  return (
    <Stack width={"600px"} spacing={2}>
      <Stack direction="row" spacing={2}>
        <FormControl variant="standard" sx={{ width: 250 }}>
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
        <FormControl variant="standard" sx={{ width: 250 }}>
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
        <FormControl variant="standard" sx={{ width: 250 }}>
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
      </Stack>
      <Stack spacing={2}>
        <Autocomplete
          disablePortal
          options={rootState.room.list.map((r) => r.room)}
          onChange={(e, options) => setValue("room", `${options}`)}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label={"Аудитория"} />
          )}
        />
        <Autocomplete
          multiple
          id="tags-standard"
          options={rootState.group.list}
          getOptionLabel={(option) => option.label}
          fullWidth
          onChange={(event, newValue) => {
            setValue("groups", newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Группы" placeholder="Favorites" />
          )}
        />
      </Stack>
      <Box>
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={handleSubmit(setClass)}
        >
          Сохранить
        </Button>
      </Box>
    </Stack>
  );
};

export default CellForm;
