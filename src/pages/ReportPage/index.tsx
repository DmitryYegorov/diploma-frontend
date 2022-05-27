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
  ButtonGroup,
  CircularProgress,
} from "@mui/material";
import {
  CalendarToday as CalendarTodayIcon,
  Circle as CircleIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  TableView as TableViewIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useStyles } from "./styled";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n";
import ListClasses from "./components/ListClasses";
import LoadReportTable from "../../components/LoadReportTable";
import { ReportState } from "../../typings/enum";
import { ReportStateConfig } from "../../helpers";
import {
  fetchReportById,
  loadDataToReport,
  sendReport,
} from "../../http/report";
import { useAsyncFn } from "react-use";
import { LoadingButton } from "@mui/lab";

const ReportPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation(["report", "common"], { i18n });

  const classes = useStyles();

  const [report, fetchReport] = useAsyncFn(async (reportId) => {
    const res = await fetchReportById(reportId);

    return res.data;
  });
  const [load, fetchLoad] = useAsyncFn(async (reportId) => {
    const res = await loadDataToReport(reportId);

    return res.data;
  });

  useEffect(() => {
    if (id) {
      Promise.all([fetchReport(id), fetchLoad(id)]);
    }
  }, [id, fetchReport]);

  if (report.loading)
    return (
      <div style={{ position: "absolute", top: "50%", left: "50%" }}>
        <CircularProgress />
      </div>
    );

  if (report.value)
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">{`${t("report:reportLabel")}: ${
              report.value.name
            }`}</Typography>
          </Grid>
          <Grid item xs={8}>
            <ListClasses
              loadData={load.value?.length ? load.value : []}
              reportId={report.value.id}
              fetchLoadData={() => fetchLoad(report.value.id)}
            />
            <LoadReportTable />
          </Grid>
          {report.value.id && (
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarTodayIcon />
                    </ListItemIcon>
                    <ListItemText>{report.value.createdAt}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        style={{
                          color:
                            ReportStateConfig[report.value.state as ReportState]
                              .color,
                        }}
                      >
                        {t(`report:state.${report.value.state as ReportState}`)}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography>{report.value.createdBy}</Typography>
                    </ListItemText>
                  </ListItem>
                  {report.value.state !== ReportState.SENT && (
                    <ListItem>
                      <Button
                        startIcon={<SendIcon />}
                        onClick={() => sendReport(report.value.id)}
                      >
                        {t("common:send")}
                      </Button>
                    </ListItem>
                  )}
                </List>
              </Paper>
            </Grid>
          )}
        </Grid>
      </>
    );
};

export default ReportPage;
