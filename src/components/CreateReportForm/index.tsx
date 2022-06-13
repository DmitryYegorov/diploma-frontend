import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import { createReport } from "../../http/report";
import { useAsyncFn } from "react-use";
import toast from "react-hot-toast";

type Props = {
  invokeFetch?: () => Promise<void | any>;
};

const CreateReportForm: React.FC<Props> = ({ invokeFetch }) => {
  const { t } = useTranslation(["common", "calendar", "report"], { i18n });
  const { handleSubmit, register, setValue, control } = useForm();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    register("name", { required: true });
    register("startDate", { required: true });
    register("endDate", { required: true });
  }, [register]);

  const [state, submitData] = useAsyncFn(async (data) => {
    const res = await createReport(data);
    await invokeFetch();

    if (res.data) {
      toast.success(`Отчёт ${res.data.name} создан успешно!`);
    }

    return res.data;
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label={t("common:nameLabel")}
          fullWidth
          onChange={(e) => setValue("name", e.target.value as string)}
        />
      </Grid>

      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label={t("calendar:startDate")}
            inputFormat="dd/MM/yyyy"
            value={startDate}
            renderInput={(params) => <TextField {...params} fullWidth />}
            onChange={(date) => {
              setStartDate(date!);
              setValue("startDate", date);
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label={t("calendar:endDate")}
            inputFormat="dd/MM/yyyy"
            value={endDate}
            renderInput={(params) => <TextField {...params} fullWidth />}
            onChange={(date) => {
              setEndDate(date!);
              setValue("endDate", date);
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={4}>
        <LoadingButton
          variant="outlined"
          onClick={handleSubmit(submitData)}
          loading={state.loading}
        >
          {t("common:send")}
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default CreateReportForm;
