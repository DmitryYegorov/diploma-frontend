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
} from "@mui/material";
import SelectLoadType from "../SelectLoadType";
import SelectForm from "../../../../../components/SelectForm";
import { useAsyncFn } from "react-use";
import { fetchFacultiesList } from "../../../../../http/group";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import moment from "moment";
import DatePicker from "../../../../../components/DatePicker";
import { saveOtherLoadDataToReport } from "../../../../../http/report";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { fetchSubjectsAction } from "../../../../../store/reducers/Subject/ActionCreators";
import { EventType } from "../../../../../typings/enum";

type Props = {
  mode: "edit" | "create";
  loadData?: any;
  onDataSending: () => Promise<void | any>;
};

const LoadDataForm: React.FC<Props> = ({ mode, loadData, onDataSending }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    watch,
  } = useForm();

  const { t } = useTranslation(["common", "report"], { i18n });
  const dispatch = useAppDispatch();
  const subjectState = useAppSelector((state) => state.subject);

  const [faculties, fetchFaculties] = useAsyncFn(async () => {
    const { data } = await fetchFacultiesList();

    return data;
  });

  let countFieldName = "none";

  if (mode === "edit" && loadData) {
    countFieldName = !!loadData.studentsCount
      ? "studentsCount"
      : !!loadData.groupsCount
      ? "groupsCount"
      : "none";
  }

  const [count, setCount] = useState(countFieldName);
  const [date, setDate] = React.useState<Date | null>(new Date());

  useEffect(() => {
    fetchFaculties();
  }, [fetchFaculties]);

  useEffect(() => {
    dispatch(fetchSubjectsAction());
  }, [dispatch]);

  useEffect(() => {
    register("type", { required: true });
    register("facultyId", { required: true });
    register("studentsCount");
    register("groupsCount");
    register("duration", { required: true });
    register("date", { required: true, value: date });
    register("subjectId");
  }, [register]);

  const sendDataToServer = async (data) => {
    alert(mode);
    if (mode === "edit") {
      alert("Not edit api function, wait:)");
    }
    if (mode === "create") {
      await saveOtherLoadDataToReport(data);
      await onDataSending();
    }
  };

  return (
    <Container style={{ margin: "0 auto" }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <SelectLoadType
            handleChange={(e) => setValue("type", e.target.value)}
            {...(mode === "edit" && loadData ? { value: loadData.type } : {})}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectForm
            label={t("report:subjectName")}
            handleChange={(e) => setValue("subjectId", e.target.value)}
            options={subjectState.list.map((s) => ({
              label: s.name,
              value: s.id,
            }))}
            loading={subjectState.isLoading}
            disabled={
              ![
                EventType.EXAM,
                EventType.COURSE_WORK,
                EventType.CREDIT,
              ].includes(watch().type as EventType)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <SelectForm
            label={t("report:faculty")}
            handleChange={(e) => setValue("facultyId", e.target.value)}
            options={
              faculties.value &&
              faculties.value.map((f) => ({ label: f.name, value: f.id }))
            }
            loading={faculties.loading}
            {...(mode === "edit" && loadData
              ? { value: loadData.facultyId }
              : {})}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              {t("report:count")}
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            >
              <Stack direction="row">
                <FormControlLabel
                  value="studentsCount"
                  control={<Radio size="small" />}
                  label={t("report:studentsCount")}
                />
                <FormControlLabel
                  value="groupsCount"
                  control={<Radio size="small" />}
                  label={t("report:subgroupsCount")}
                />
                <FormControlLabel
                  value="none"
                  control={<Radio size="small" />}
                  label={t("report:withOutCount")}
                />
              </Stack>
            </RadioGroup>
            {count !== "none" && (
              <TextField
                label={t("report:count")}
                type="number"
                fullWidth
                onChange={(e) => {
                  if (count !== "none") {
                    setValue(count, parseInt(e.target.value));
                  }
                }}
                {...(mode === "edit" && loadData && count !== "none"
                  ? { value: loadData[count] }
                  : {})}
              />
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("report:duration")}
            type="number"
            fullWidth
            onChange={(e) => setValue("duration", parseFloat(e.target.value))}
            {...(mode === "edit" && loadData
              ? { value: loadData.duration }
              : {})}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Button variant="contained" onClick={handleSubmit(sendDataToServer)}>
          {t("common:send")}
        </Button>
      </Grid>
    </Container>
  );
};

export default LoadDataForm;
