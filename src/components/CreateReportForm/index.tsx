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
import moment from "moment";
import DatePicker from "../DatePicker";

type Props = {
  invokeFetch?: () => Promise<void | any>;
};

const CreateReportForm: React.FC<Props> = ({ invokeFetch }) => {
  const { t } = useTranslation(["common", "calendar", "report"], { i18n });
  const [date, setDate] = useState(new Date());
  const { handleSubmit, register, setValue, control } = useForm({
    defaultValues: {
      name: moment(date).format("MMMM yyyy"),
      startDate: moment(date).startOf("month").toDate(),
      endDate: moment(date).endOf("month").toDate(),
    },
  });

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
          value={moment(date).format("MMMM yyyy")}
        />
      </Grid>

      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={t("report:period")}
            views={["year", "month"]}
            minDate={moment.utc().add(-1, "years").toDate()}
            maxDate={moment.utc().add(1, "years").toDate()}
            onChange={(month) => {
              setDate(month);
              setValue(
                "startDate",
                moment.utc(month).startOf("month").toDate()
              );
              setValue("endDate", moment.utc(month).endOf("month").toDate());
              setValue("name", moment.utc(month).format("MMMM yyyy"));
            }}
            value={date}
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
