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

const ReportPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation(["report"], { i18n });
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { selectedReport, loadedClasses, isLoading, load } = useAppSelector(
    (state) => state.report
  );

  useEffect(() => {
    dispatch(clearLoadedClassesAction());
    if (id) {
      dispatch(fetchOneReportAction(id));
    }
  }, [id, dispatch]);

  const loadClassesColumns: Column[] = [
    { id: "title", label: t("report:nameLabel"), sortable: false },
    {
      id: "date",
      label: t("report:classDate"),
      sortable: false,
      renderCell: (row, column) => (
        <TableCell>{moment.utc(row.date).format("DD-MM-yyyy")}</TableCell>
      ),
    },
    {
      id: "type",
      label: t("report:classType"),
      sortable: false,
      renderCell: (row, column) => (
        <TableCell>{t(`event:${row.type}`, "-")}</TableCell>
      ),
    },
    {
      id: "updateType",
      label: t("report:classUpdateNote"),
      sortable: false,
      renderCell: (row, column) => (
        <TableCell>{t(`event:updateType.${row.updateType}`, "-")}</TableCell>
      ),
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
                onClick={() =>
                  dispatch(loadClassesForReportAction(selectedReport.id))
                }
              >
                {t("report:loadClassesBtn")}
              </Button>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Collapse orientation="vertical" in={loadedClasses.length}>
            <Paper className={classes.paper}>
              <Typography variant="h6">{t("report:classes")}</Typography>
              <TableList
                rows={loadedClasses}
                columns={loadClassesColumns}
                rowsPerPage={rowsPerPage}
                setOnPage={(count) => setRowsPerPage(count)}
                isLoading={isLoading}
                count={loadedClasses.length}
                currentPage={currentPage}
                setPage={(page) => setCurrentPage(page)}
                onRowClick={(row) => undefined}
              />
              <LoadReportTable />
              <Stack direction="row" alignItems="center" spacing={1}>
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
