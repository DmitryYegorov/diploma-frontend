import React from "react";
import { Stack, TextField } from "@mui/material";
import SelectForm from "../../../../components/SelectForm";
import { totalReportMap } from "../../../../helpers";
import { useAppSelector } from "../../../../hooks/redux";
import { useForm, useWatch } from "react-hook-form";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { useAsyncFn } from "react-use";
import { createTotalReport } from "../../../../http/report";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

interface ReportDataItem {
  createdBy: string;
  name: string;
  id: string;
  type: string;
  periodLabel?: string;
}

type Props = {
  checkedReports: Array<ReportDataItem>;
};

const CheckedReportModal: React.FC<Props> = ({ checkedReports }) => {
  const { list, academicYears } = useAppSelector((state) => state.semester);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const watch = useWatch({ control });

  // eslint-disable-next-line no-console
  console.log(errors);

  React.useEffect(() => {
    register("name", { required: true });
    register("type", { required: true });
    register("semesterId", { required: watch.type === "SEMESTER" });
    register("academicYearId", { required: watch.type === "ACADEMIC_YEAR" });
  }, [register]);

  const [state, createTotalSubmit] = useAsyncFn(async (data) => {
    try {
      const res = await createTotalReport({
        ...data,
        reportIds: checkedReports.map((report) => report.id),
      });

      if (res.data.id) {
        const message = `Отчёт ${res.data.name.toUpperCase()} сохранен!`;
        toast.success(message);
      }
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { message } = (e as AxiosError).response.data;
        toast.error(message);
      }
    }
  });

  return (
    <Stack style={{ width: 400 }} spacing={1}>
      <table>
        {checkedReports.map((report, index) => (
          <tr>
            <td>{index + 1})</td>
            <td style={{ padding: 3 }}>{report.name}</td>
            <td>{report.createdBy}</td>
            <td>{report.type}</td>
            <td>{report.periodLabel}</td>
          </tr>
        ))}{" "}
      </table>
      <TextField
        label={"Название"}
        fullWidth
        onChange={(e) => setValue("name", e.target.value)}
      />
      <SelectForm
        label={"Тип"}
        handleChange={(e) => setValue("type", e.target.value)}
        options={Object.keys(totalReportMap).map((key) => ({
          value: key,
          label: totalReportMap[key],
        }))}
        value={watch.type}
      />
      {watch.type === "SEMESTER" ? (
        <SelectForm
          label={"Выберите семестр"}
          handleChange={(e) => setValue("semesterId", e.target.value)}
          options={list.map((sem) => ({
            value: sem.id,
            label: sem.name,
          }))}
          value={watch.semesterId}
        />
      ) : null}
      {watch.type === "ACADEMIC_YEAR" ? (
        <SelectForm
          label={"Выберите уч.год"}
          handleChange={(e) => setValue("academicYearId", e.target.value)}
          options={academicYears.map((year) => ({
            value: year.id,
            label: `${moment
              .utc(year.startDate)
              .format("DD-MM-yyyy")} - ${moment
              .utc(year.endDate)
              .format("DD-MM-yyyy")}`,
          }))}
          value={watch.academicYearId}
        />
      ) : null}
      <LoadingButton
        loading={state.loading}
        onClick={handleSubmit(createTotalSubmit)}
      >
        Создать
      </LoadingButton>
    </Stack>
  );
};

export default CheckedReportModal;
