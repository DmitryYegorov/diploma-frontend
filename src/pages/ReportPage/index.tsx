import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TableCell,
  Stack,
  Alert,
  Collapse,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  clearLoadedClassesAction,
  fetchOneReportAction,
  loadClassesForReportAction,
} from "../../store/reducers/Report/ActionCreators";
import { useStyles } from "./styled";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n";
import TableList from "../../components/TableList";
import { Column } from "../../components/TableList/typings";
import moment from "moment";
import LoadReportTable from "../../components/LoadReportTable";
import { ClassType, ScheduleClassUpdateType } from "../../typings/enum";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

const paginate = (list, page, size) => {
  const res = list.slice(page * size, page * size + size);
  // eslint-disable-next-line no-console
  console.log({ res });
  return res;
};

const ReportPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation(["report"], { i18n });

  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { selectedReport, loadedClasses, load } = useAppSelector(
    (state) => state.report
  );

  useEffect(() => {
    dispatch(clearLoadedClassesAction());
    if (id) {
      dispatch(fetchOneReportAction(id));
    }
  }, [id, dispatch]);

  const loadClassesColumns = [
    {
      id: "title",
      label: t("report:nameLabel"),
      width: 300,
      sortable: false,
    },
    {
      id: "date",
      label: t("report:classDate"),
      renderCell: (row) => <TableCell>{row.date}</TableCell>,
      width: 150,
      sortable: false,
    },
    {
      id: "type",
      label: t("report:classType"),
      width: 250,
      renderCell: (row) => {
        const key = `event:${row.type as ClassType}`;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return <TableCell>{t(key, "-")}</TableCell>;
      },
      sortable: false,
    },
    {
      id: "updateType",
      label: t("report:classUpdateNote"),
      width: 150,
      renderCell: (row) => {
        const key = `event:updateType.${
          row.updateType as ScheduleClassUpdateType
        }`;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return <TableCell>{t(key, "-")}</TableCell>;
      },
      sortable: false,
    },
  ];

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6">
              {selectedReport.name} ({selectedReport.createdBy},{" "}
              {selectedReport.startDate} - {selectedReport.endDate})
            </Typography>
            {!loadedClasses.length && (
              <Button
                variant="text"
                onClick={() => {
                  dispatch(clearLoadedClassesAction());
                  dispatch(loadClassesForReportAction(selectedReport.id));
                }}
              >
                {t("report:loadClassesBtn")}
              </Button>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Collapse orientation="vertical" in={!!loadedClasses.length}>
            <Paper className={classes.paper}>
              <Typography variant="h6">{t("report:classes")}</Typography>
              <TableList
                columns={loadClassesColumns}
                rows={loadedClasses}
                count={loadedClasses.length}
              />

              <LoadReportTable load={load} />
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                style={{ marginTop: 20 }}
              >
                <Button variant="contained">{t("report:applyLabel")}</Button>
                <Alert severity="info">{t("report:applyTooltip")}</Alert>
              </Stack>
            </Paper>
          </Collapse>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReportPage;
