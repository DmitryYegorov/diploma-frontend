import React, { useState } from "react";
import { Button, Grid, Paper, Stack, useMediaQuery } from "@mui/material";
import DatePicker from "../../../../../components/DatePicker";
import SelectLoadType from "../SelectLoadType";
import { FilterAlt as FilterAltIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import moment from "moment";
import { useStyles } from "./styled";

type Props = {
  fetchWithOptions: (options: any) => Promise<void | any>;
  semesterId: string;
};

const FilterForm: React.FC<Props> = ({ fetchWithOptions, semesterId }) => {
  const classes = useStyles();
  const { t } = useTranslation(["common", "event", "report"], { i18n });

  const [startDate, setStartDate] = useState(
    moment().startOf("month").toDate()
  );
  const [endDate, setEndDate] = useState(moment().endOf("month").toDate());
  const [type, setType] = useState();

  const isDesktop = useMediaQuery("(min-width: 680px)");

  return (
    <Paper className={classes.padding}>
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
        <SelectLoadType handleChange={(e) => setType(e.target.value)} />
        <Button
          variant="outlined"
          onClick={() => {
            const options = { endDate, startDate, type };
            const query = Object.keys(options)
              .filter((key) => !!options[key])
              .map((key) => [key, options[key]]);
            fetchWithOptions({ semesterId, ...Object.fromEntries(query) });
          }}
          fullWidth
          style={{ maxWidth: 150 }}
        >
          {t("common:applyFilter")}
        </Button>
      </Stack>
    </Paper>
  );
};

export default FilterForm;
