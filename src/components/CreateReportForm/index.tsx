import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import { useForm, useWatch } from "react-hook-form";
import { createReport } from "../../http/report";
import SelectForm from "../SelectForm";
import { reportTypeMap } from "../../helpers";

type Props = {
  invokeFetch?: () => Promise<void | any>;
};

const CreateReportForm: React.FC<Props> = ({ invokeFetch }) => {
  const { t } = useTranslation(["common", "calendar", "report"], { i18n });
  const { handleSubmit, register, setValue, control } = useForm();
  const watch = useWatch({ control });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    register("name", { required: true });
    register("startDate", { required: true });
    register("endDate", { required: true });
    register("type", { required: true });
  });

  const sendData = async (data: any) => {
    await createReport(data);
    await invokeFetch();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TextField
          label={t("common:nameLabel")}
          fullWidth
          onChange={(e) => setValue("name", e.target.value as string)}
        />
      </Grid>
      <Grid item xs={4}>
        <SelectForm
          label={t("report:reportType")}
          handleChange={(e) => setValue("type", e.target.value)}
          options={Object.keys(reportTypeMap).map((key) => ({
            label: reportTypeMap[key],
            value: key,
          }))}
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
        <Button variant="outlined" onClick={handleSubmit(sendData)}>
          {t("common:send")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateReportForm;
