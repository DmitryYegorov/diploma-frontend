import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Container,
  Autocomplete,
} from "@mui/material";
import SelectLoadType from "../SelectLoadType";
import SelectForm from "../../../../../components/SelectForm";
import { useAsyncFn } from "react-use";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import moment from "moment";
import DatePicker from "../../../../../components/DatePicker";
import {
  saveOtherLoadData,
  updateOtherLoadItem,
} from "../../../../../http/report";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

type Props = {
  mode: "edit" | "create";
  loadData?: any;
  onDataSending: () => Promise<void | any>;
  semesterId: string;
};

const LoadDataForm: React.FC<Props> = ({
  mode,
  loadData,
  onDataSending,
  semesterId,
}) => {
  const editingMode = mode === "edit" && loadData;

  const defaultValues = editingMode
    ? {
        type: loadData.type,
        studentsCount: loadData.studentsCount,
        groups: loadData.subGroupsLabels.map((g) => g.id),
        duration: loadData.duration,
        date: loadData.date,
        subjectId: loadData.subjectId,
      }
    : {};

  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues,
  });
  const watch = useWatch({ control });

  const { t } = useTranslation(["common", "report"], { i18n });
  const subjectState = useAppSelector((state) => state.subject);
  const groups = useAppSelector((state) => state.group);
  const semester = useAppSelector((state) => state.semester);

  const [date, setDate] = React.useState<Date | null>(new Date());

  useEffect(() => {
    register("type", { required: true });
    register("studentsCount");
    register("groups");
    register("duration", { required: true });
    register("date", { required: true, value: date });
    register("subjectId");
  }, [register]);

  const createLoadItem = async (data) => {
    try {
      const res = await saveOtherLoadData({
        ...data,
        semesterId,
        groups: data.groups?.length ? data.groups.map((g) => g.id) : null,
      });
      if (res.data) {
        toast.success("Данные сохранены!");
      }
      await onDataSending();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e as AxiosError;
        toast.error(response.data.message);
      }
    }
  };

  const [newSemesterId, setNewSemesterId] = useState(loadData?.semesterId);

  const updateLoadItem = async (data) => {
    try {
      const req = {
        ...data,
        semesterId: newSemesterId,
        groups: data.groups?.length ? data.groups.map((g) => g.id) : null,
      };

      const res = await updateOtherLoadItem(loadData.id, req);
      if (res.data) {
        toast.success("Данные сохранены!");
      }
      await onDataSending();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e as AxiosError;
        toast.error(response.data.message);
      }
    }
  };

  const sendDataToServer = async (data) => {
    if (mode === "create") {
      await createLoadItem(data);
    } else if (editingMode) {
      await updateLoadItem(data);
    }
  };

  return (
    <Stack spacing={1} style={{ width: 350 }}>
      {editingMode && (
        <SelectForm
          label={"Семестр"}
          handleChange={(e) => setNewSemesterId(e.target.value)}
          options={semester.list.map((s) => ({
            label: s.name,
            value: s.id,
          }))}
          value={semesterId}
        />
      )}
      <SelectLoadType
        handleChange={(e) => setValue("type", e.target.value)}
        {...(editingMode ? { value: watch.type } : {})}
      />
      <SelectForm
        label={t("report:subjectName")}
        handleChange={(e) => setValue("subjectId", e.target.value)}
        options={subjectState.list.map((s) => ({
          label: s.name,
          value: s.id,
        }))}
        {...(editingMode ? { value: watch.subjectId } : {})}
        loading={subjectState.isLoading}
      />
      <TextField
        label={t("report:studentCount")}
        type="number"
        fullWidth
        onChange={(e) => setValue("studentsCount", +e.target.value)}
        {...(editingMode ? { value: watch.studentsCount } : {})}
      />
      <Autocomplete
        multiple
        id="tags-standard"
        options={groups.list}
        getOptionLabel={(option: any) => option.label}
        fullWidth
        onChange={(event, newValue) => setValue("groups", newValue)}
        {...(editingMode
          ? {
              defaultValue: groups.list.filter((item) =>
                watch.groups.includes(item.id)
              ),
            }
          : {})}
        renderInput={(params) => (
          <TextField {...params} label="Группы" fullWidth />
        )}
      />
      <TextField
        label={t("report:duration")}
        type="number"
        fullWidth
        onChange={(e) => setValue("duration", parseFloat(e.target.value))}
        {...(editingMode ? { value: watch.duration } : {})}
      />
      <DatePicker
        label={t("report:dateMark")}
        views={["year", "month"]}
        minDate={moment().add(-1, "years").toDate()}
        maxDate={moment().add(1, "years").toDate()}
        onChange={(month) => {
          setDate(month);
          setValue("date", month);
        }}
        value={mode === "edit" ? loadData.date : date}
      />
      <Button variant="contained" onClick={handleSubmit(sendDataToServer)}>
        {t("common:send")}
      </Button>
    </Stack>
  );
};

export default LoadDataForm;
