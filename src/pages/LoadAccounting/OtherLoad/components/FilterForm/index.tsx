import React, { useState } from "react";
import { Box, Button, Grid, Paper, Stack, useMediaQuery } from "@mui/material";
import DatePicker from "../../../../../components/DatePicker";
import SelectLoadType from "../SelectLoadType";
import { FilterAlt as FilterAltIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import moment from "moment";
import { useStyles } from "./styled";
import SelectForm from "../../../../../components/SelectForm";

type Props = {
  fetchWithOptions: (options: any) => Promise<void | any>;
  subjectList: Array<any>;
  semesterId: string;
};

const FilterForm: React.FC<Props> = ({
  fetchWithOptions,
  semesterId,
  subjectList,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(["common", "event", "report"], { i18n });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [type, setType] = useState();
  const [subjectId, setSubjectId] = useState();

  const isDesktop = useMediaQuery("(min-width: 680px)");

  React.useEffect(() => {
    fetchWithOptions({ type, startDate, endDate, subjectId });
  }, [type, startDate, endDate, subjectId]);

  return (
    <Box className={classes.root}>
      <Stack direction={isDesktop ? "row" : "column"} spacing={1}>
        <DatePicker
          label={t("common:period.start")}
          onChange={(date) => setStartDate(date)}
          value={startDate}
        />
        <DatePicker
          label={t("common:period.end")}
          onChange={(date) => setEndDate(date)}
          value={endDate}
        />
        <SelectLoadType
          handleChange={(e) => setType(e.target.value)}
          value={type}
        />
        <SelectForm
          label={"Дисциплина"}
          handleChange={(e) => setSubjectId(e.target.value)}
          options={[
            { value: null, label: "Все" },
            ...subjectList.map((subject) => ({
              label: subject.name,
              value: subject.id,
            })),
          ]}
          value={subjectId || null}
        />
        <Button
          variant={"outlined"}
          onClick={() => {
            setSubjectId(null);
            setType(null);
            setStartDate(null);
            setEndDate(null);
          }}
          style={{ minWidth: 100 }}
          disabled={!(type || endDate || startDate || subjectId)}
        >
          Сбросить
        </Button>
      </Stack>
    </Box>
  );
};

export default FilterForm;
