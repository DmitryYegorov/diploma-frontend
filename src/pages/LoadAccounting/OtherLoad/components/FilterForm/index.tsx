import React, { useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import DatePicker from "../../../../../components/DatePicker";
import SelectLoadType from "../SelectLoadType";
import { FilterAlt as FilterAltIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import moment from "moment";
import { useStyles } from "./styled";

const FilterForm: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation(["common", "event", "report"], { i18n });

  const [startDate, setStartDate] = useState(
    moment().startOf("month").toDate()
  );

  const [endDate, setEndDate] = useState(moment().endOf("month").toDate());

  return (
    <Paper className={classes.padding}>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <DatePicker
            label={t("common:period.start")}
            onChange={(date) => setStartDate(date)}
            value={startDate}
          />
        </Grid>
        <Grid item xs={3}>
          <DatePicker
            label={t("common:period.end")}
            onChange={(date) => setEndDate(date)}
            value={endDate}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectLoadType width={250} handleChange={() => undefined} />
        </Grid>
        <Grid item xs={3}>
          <Button startIcon={<FilterAltIcon />} variant="contained">
            {t("common:applyFilter")}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterForm;
