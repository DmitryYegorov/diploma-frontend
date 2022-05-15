import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Paper,
  Typography,
  Button,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
} from "@mui/material";
import {
  CalendarToday as CalendarTodayIcon,
  Circle as CircleIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchOneReportAction } from "../../store/reducers/Report/ActionCreators";
import { useStyles } from "./styled";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n";
import ListClasses from "./components/ListClasses";
import ReportMenu from "./components/ReportMenu";
import LoadReportTable from "../../components/LoadReportTable";
import { ReportState } from "../../typings/enum";
import { ReportStateConfig } from "../../helpers";
import { useAsyncFn } from "react-use";
import {
  getCalculatedReportDataByReportId,
  loadScheduleClassesToReport,
} from "../../http/report";
import { reportSlice } from "../../store/reducers/Report/slice";

const ReportPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation(["report"], { i18n });

  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { selectedReport, reportData, calculatedReport } = useAppSelector(
    (state) => state.report
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOneReportAction(id));
    }
  }, [id, dispatch]);

  return (
    <>
      <ReportMenu />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">{`${t("report:reportLabel")}: ${
            selectedReport.name
          }`}</Typography>
        </Grid>
        <Grid item xs={8}>
          {reportData.length ? (
            <>
              <ListClasses loadData={reportData} reportId={selectedReport.id} />
              <LoadReportTable load={calculatedReport} />
            </>
          ) : (
            <Alert severity="info">{t("report:emptyReportText")}</Alert>
          )}
        </Grid>
        {selectedReport.id && (
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CalendarTodayIcon />
                  </ListItemIcon>
                  <ListItemText>{selectedReport.createdAt}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CircleIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      style={{
                        color:
                          ReportStateConfig[selectedReport.state as ReportState]
                            .color,
                      }}
                    >
                      {t(`report:state.${selectedReport.state as ReportState}`)}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>{selectedReport.createdBy}</Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ReportPage;
