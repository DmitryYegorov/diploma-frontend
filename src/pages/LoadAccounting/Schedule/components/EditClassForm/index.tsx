import React, { useEffect } from "react";
import {
  Autocomplete,
  CircularProgress,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import SelectForm from "../../../../../components/SelectForm";
import { ClassType, Week, WeekDay } from "../../../../../typings/enum";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import DatePicker from "../../../../../components/DatePicker";
import { useForm } from "react-hook-form";
import { updateScheduleClassData } from "../../../../../http/schedule";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { fetchScheduleClassesOfTeacherBySemesterId } from "../../../../../store/reducers/ScheduleClass/ActionCreators";

type Props = {
  editData: any;
};

const weekMapLabel = [
  {
    value: Week.WEEKLY,
    label: "Каждую неделю",
  },
  {
    value: Week.FIRST,
    label: "Первая неделя",
  },
  {
    value: Week.SECOND,
    label: "Вторая неделя",
  },
];

const classTypeMapLabel = [
  {
    value: ClassType.LAB,
    label: "Лабораторная работа",
  },
  {
    value: ClassType.LECTION,
    label: "Лекция",
  },
  {
    value: ClassType.PRACTICE_CLASS,
    label: "Практическое занятие",
  },
];

const weekDaysOptions: { value: any; label: string }[] = [
  { value: WeekDay.MONDAY, label: "Понедельник" },
  { value: WeekDay.TUESDAY, label: "Вторник" },
  { value: WeekDay.WEDNESDAY, label: "Среда" },
  { value: WeekDay.THURSDAY, label: "Четверг" },
  { value: WeekDay.FRIDAY, label: "Пятница" },
  { value: WeekDay.SATURDAY, label: "Суббота" },
  { value: WeekDay.SUNDAY, label: "Воскресенье" },
];

const EditClassForm: React.FC<Props> = ({ editData }) => {
  const { t } = useTranslation(["common", "calendar"], { i18n });

  const dispatch = useAppDispatch();

  const { list } = useAppSelector((state) => state.subject);
  const times = useAppSelector((state) => state.scheduleTime);
  const group = useAppSelector((state) => state.group);
  const semester = useAppSelector((state) => state.semester);

  const [startDate, setStartDate] = React.useState(editData.startDate);
  const [endDate, setEndDate] = React.useState(editData.endDate);
  const [groups, setGroups] = React.useState(editData.groups);

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      week: editData.week,
      subjectId: editData.subject.id,
      type: editData.type,
      weekDay: editData.weekDay,
      scheduleTimeId: editData.time.id,
      startDate: editData.startDate,
      endDate: editData.endDate,
      groups: editData.groups,
    },
  });

  React.useEffect(() => {
    register("week", { required: true });
    register("subjectId", { required: true });
    register("type", { required: true });
    register("weekDay", { required: true });
    register("scheduleTimeId", { required: true });
    register("groups", { required: true });
    register("startDate");
    register("endDate");
  }, [register]);

  // eslint-disable-next-line no-console
  const submitData = async (data) => {
    try {
      const res = await updateScheduleClassData(editData.id, data);
      toast.success("Изменение успешно применены!");

      dispatch(
        fetchScheduleClassesOfTeacherBySemesterId(semester.selectedSemester.id)
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const serverError = e as AxiosError;
        toast.error(serverError.response.data.message);
      }
    }
  };
  return (
    <Stack style={{ width: 350 }} spacing={2}>
      <SelectForm
        label={"Неделя"}
        handleChange={(e) => setValue("week", e.target.value as Week)}
        options={weekMapLabel}
        value={editData.week}
      />
      <SelectForm
        label={"Дисциплина"}
        handleChange={(e) => setValue("subjectId", e.target.value)}
        options={list.map((s) => ({ value: s.id, label: s.name }))}
        value={editData.subject.id}
      />
      <SelectForm
        label={"Тип занятия"}
        handleChange={(e) => setValue("type", e.target.value as ClassType)}
        options={classTypeMapLabel}
        value={editData.type}
      />
      <SelectForm
        label={"День недели"}
        handleChange={(e) => setValue("weekDay", e.target.value as WeekDay)}
        options={weekDaysOptions}
        value={editData.weekDay}
      />
      <SelectForm
        label={"Время"}
        handleChange={(e) => setValue("scheduleTimeId", e.target.value)}
        options={times.list.map((time) => ({
          value: time.id,
          label: `${moment(time.startTime).format("HH:mm")} - ${moment(
            time.endTime
          ).format("HH:mm")}`,
        }))}
        value={editData.time.id}
      />
      <Autocomplete
        multiple
        id="tags-standard"
        options={group.list}
        getOptionLabel={(option) => option.label}
        fullWidth
        onChange={(event, newValue) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setGroups(newValue);
          setValue("groups", newValue);
        }}
        value={groups}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Группы"
            placeholder="Favorites"
            fullWidth
          />
        )}
      />
      <DatePicker
        label={t("calendar:startDate")}
        onChange={(newValue) => {
          setStartDate(newValue);
          setValue("startDate", newValue);
        }}
        value={startDate}
      />
      <DatePicker
        label={t("calendar:endDate")}
        onChange={(newValue) => {
          setEndDate(newValue);
          setValue("endDate", newValue);
        }}
        value={endDate}
      />
      <Button variant="contained" onClick={handleSubmit(submitData)}>
        Сохранить
      </Button>
    </Stack>
  );
};

export default EditClassForm;
