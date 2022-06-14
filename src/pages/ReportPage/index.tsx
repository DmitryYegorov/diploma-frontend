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
  useMediaQuery,
  Stack,
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
import MonthLoadMappedTable from "../../components/MonthLoadMappedTable";
import { ReportState } from "../../typings/enum";
import { ReportStateConfig } from "../../helpers";
import {
  fetchReportById,
  fetchReportNotes,
  getMappedMonthReport,
  loadDataToReport,
  sendReport,
} from "../../http/report";
import { useAsyncFn } from "react-use";
import Comment from "../../components/Comment";

const ReportPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation(["report", "common"], { i18n });

  const isDesktop = useMediaQuery("(min-width: 680px)");

  const classes = useStyles();

  const [report, fetchReport] = useAsyncFn(async (reportId) => {
    const res = await fetchReportById(reportId);

    return res.data;
  });
  const [load, fetchLoad] = useAsyncFn(async (reportId) => {
    const res = await loadDataToReport(reportId);

    return res.data;
  });
  const [mapped, fetchMapped] = useAsyncFn(async (reportId) => {
    const res = await getMappedMonthReport(reportId);

    return res.data;
  });
  const [notes, fetchNotes] = useAsyncFn(async (reportId) => {
    const res = await fetchReportNotes(reportId);

    return res.data;
  });

  useEffect(() => {
    if (id) {
      Promise.all([
        fetchReport(id),
        fetchLoad(id),
        fetchMapped(id),
        fetchNotes(id),
      ]);
    }
  }, [id, fetchReport, fetchLoad, fetchMapped]);

  if (report.loading)
    return (
      <div style={{ position: "absolute", top: "50%", left: "50%" }}>
        <CircularProgress />
      </div>
    );

  if (report.value)
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">{`${t("report:reportLabel")}: ${
              report.value.name
            }`}</Typography>
          </Grid>
          <Grid item xs={isDesktop ? 8 : 12}>
            <ListClasses
              loadData={load.value?.length ? load.value : []}
              reportId={report.value.id}
              fetchLoadData={() => fetchLoad(report.value.id)}
            />
            <MonthLoadMappedTable
              data={mapped.value}
              loading={mapped.loading}
            />
          </Grid>
          {report.value.id && (
            <>
              <Grid item xs={isDesktop ? 4 : 12}>
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
                              ReportStateConfig[
                                report.value.state as ReportState
                              ].color,
                          }}
                        >
                          {t(
                            `report:state.${report.value.state as ReportState}`
                          )}
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
              <Grid item xs={12}>
                <Stack spacing={2}>
                  {notes.loading ? (
                    <CircularProgress />
                  ) : !notes.loading && notes.value?.length ? (
                    notes.value.map((note) => (
                      <Comment
                        id={note.id}
                        authorName={note.authorName}
                        createdAt={note.createdAt}
                        commentText={note.note}
                      />
                    ))
                  ) : null}
                </Stack>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    );
};

export default ReportPage;
