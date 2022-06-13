import React, { useState } from "react";
import { Button, Grid, Paper, Stack, useMediaQuery } from "@mui/material";
import DatePicker from "../../../../components/DatePicker";
import { FilterAlt as FilterAltIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import moment from "moment";
import SelectForm from "../../../../components/SelectForm";
import { reportTypeMap } from "../../../../helpers";
import { ReportState } from "../../../../typings/enum";

type Props = {
  fetchWithOptions: (options: any) => Promise<void | any>;
};

const FilterForm: React.FC<Props> = ({ fetchWithOptions }) => {
  const { t } = useTranslation(["common", "event", "report"], { i18n });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [type, setType] = useState();
  const [state, setState] = useState();

  React.useEffect(() => {
    const options = { startDate, endDate, type, state };
    const query = Object.keys(options).map((option) =>
      !!options[option] ? [option, options[option]] : []
    );
    fetchWithOptions(Object.fromEntries(query));
  }, [startDate, endDate, type, state]);

  const isDesktop = useMediaQuery("(min-width: 680px)");

  return (
    <Paper style={{ padding: 10 }}>
      <Stack direction={isDesktop ? "row" : "column"} spacing={1}>
        <DatePicker
          label={t("common:period.start")}
          onChange={(date) =>
            setStartDate(moment.utc(date).startOf("day").toDate())
          }
          value={startDate}
          maxDate={moment(endDate).add(-1, "day").toDate()}
        />
        <DatePicker
          label={t("common:period.end")}
          onChange={(date) =>
            setEndDate(moment.utc(date).endOf("day").toDate())
          }
          value={endDate}
          minDate={moment(startDate).add(1, "day").toDate()}
        />
        <SelectForm
          label={"Тип"}
          handleChange={(e) => setType(e.target.value)}
          options={Object.keys(reportTypeMap).map((key) => ({
            value: key,
            label: reportTypeMap[key],
          }))}
          value={type}
        />
        <SelectForm
          label={"Статус"}
          handleChange={(e) => setState(e.target.value)}
          options={Object.values(ReportState)
            .filter((key) => key !== ReportState.DRAFT)
            .map((key) => ({
              value: key,
              label: t(`report:state.${key}`),
            }))}
          value={state}
        />
        <Button
          onClick={() => {
            setState(null);
            setType(null);
            setEndDate(null);
            setStartDate(null);
          }}
          style={{ minWidth: 100 }}
        >
          Сбросить
        </Button>
      </Stack>
    </Paper>
  );
};

export default FilterForm;
