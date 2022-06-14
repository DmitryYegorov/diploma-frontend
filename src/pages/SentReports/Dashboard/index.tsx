import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useParams } from "react-router-dom";
import { fetchOneReportAction } from "../../../store/reducers/Report/ActionCreators";
import {
  Grid,
  Container,
  TextField,
  Paper,
  Typography,
  Chip,
  Stack,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useMediaQuery,
  ButtonBase,
} from "@mui/material";
import {
  CalendarToday as CalendarTodayIcon,
  Circle as CircleIcon,
  DoneOutline as DoneOutlineIcon,
  HighlightOff as HighlightOffIcon,
  Person as PersonIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import LoadReportTable from "../../../components/LoadReportTable";
import ListClasses from "../../ReportPage/components/ListClasses";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import SpeedDialMenu from "../../../components/SpeedDialMenu";
import {
  approveReport,
  cancelReport,
  fetchReportById,
  fetchReportNotes,
  getMappedMonthReport,
  loadDataToReport,
  removeReportNote,
  sendReport,
  updateReportNote,
} from "../../../http/report";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useAsyncFn } from "react-use";
import MonthLoadMappedTable from "../../../components/MonthLoadMappedTable";
import moment from "moment";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Comment from "../../../components/Comment";
import { ReportStateConfig } from "../../../helpers";
import { ReportState } from "../../../typings/enum";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["common", "report"], { i18n });

  const isDesktop = useMediaQuery("(min-width: 680px)");
  const { id } = useParams();

  const {
    data: { user },
  } = useAppSelector((state) => state.auth);

  const [reportDataState, fetchReportData] = useAsyncFn(async (reportId) => {
    const res = await loadDataToReport(reportId);
    return res.data;
  });

  const [canselReport, setCancelReport] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [mapped, fetchMapped] = useAsyncFn(async (reportId) => {
    const res = await getMappedMonthReport(reportId);

    return res.data;
  });
  const [reportState, fetchReport] = useAsyncFn(async (reportId) => {
    const res = await fetchReportById(reportId);

    return res.data;
  });
  const [comments, fetchComments] = useAsyncFn(async (reportId) => {
    const res = await fetchReportNotes(reportId);

    return res.data;
  });

  useEffect(() => {
    if (id) {
      fetchReport(id);
      fetchReportData(id);
      fetchMapped(id);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchComments(id);
  }, [fetchComments, id]);

  const [cancelState, cancelReportSubmit] = useAsyncFn(
    async (reportId, note) => {
      try {
        const res = await cancelReport(reportId, note);

        if (res.data) {
          toast.success("Запрос на изменения успешно отправлен!");
          await fetchComments(id);
        }
        return res.data;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const error = e as AxiosError;
          toast.error(error.response.data.message);
        }
      }
    }
  );
  const [approveState, approveReportSubmit] = useAsyncFn(async (reportId) => {
    try {
      const res = await approveReport(reportId);

      toast.success("Статус отчёта успешно изменен!");
      await fetchReport(id);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError;
        toast.error(error.response.data.message);
      }
    }
  });
  const [updateNoteState, updateNoteSubmit] = useAsyncFn(
    async (noteId: string, newNote: string) => {
      const res = await updateReportNote(noteId, newNote);
      await fetchReportNotes(id);

      return res.data;
    }
  );

  if (reportState.loading) {
    return (
      <div style={{ position: "relative", top: "50%", left: "50%" }}>
        <CircularProgress />
      </div>
    );
  }

  if (reportState.value) {
    const reportPeriod = `${reportState.value.startDate} - ${reportState.value.endDate}`;
    return (
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper style={{ padding: 10 }}>
              <Stack direction="row" spacing={2}>
                <Typography variant={"h5"}>
                  {reportState.value.createdBy} / {reportPeriod}
                </Typography>
                <Chip label={reportState.value.name} />
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={isDesktop ? 8 : 12}>
            <MonthLoadMappedTable
              data={mapped.value}
              loading={mapped.loading}
            />
          </Grid>
          <Grid item xs={isDesktop ? 4 : 12}>
            <Paper style={{ padding: 10 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CalendarTodayIcon />
                  </ListItemIcon>
                  <ListItemText>{reportState.value.createdAt}</ListItemText>
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
                            reportState.value.state as ReportState
                          ].color,
                      }}
                    >
                      {t(
                        `report:state.${reportState.value.state as ReportState}`
                      )}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>{reportState.value.createdBy}</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <Stack direction={"row"} spacing={1} alignContent={"center"}>
                    <Button
                      variant={"contained"}
                      color={"success"}
                      size={"small"}
                      disabled={
                        reportState.value.state === ReportState.APPROVED
                      }
                      onClick={() => approveReportSubmit(id)}
                    >
                      Принять
                    </Button>
                    <Button
                      variant={"outlined"}
                      color={"error"}
                      size={"small"}
                      disabled={
                        reportState.value.state === ReportState.REQUEST_CHANGES
                      }
                      onClick={() => setCancelReport(!canselReport)}
                    >
                      Запросить изменения
                    </Button>
                  </Stack>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <ListClasses
              loadData={reportDataState?.value ? reportDataState.value : []}
              reportId={id}
              showDataUpdateButton={false}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              {comments.loading ? (
                <div style={{ position: "relative", top: "50%", left: "50%" }}>
                  <CircularProgress />
                </div>
              ) : comments.value ? (
                comments.value.map((comment) => (
                  <Comment
                    id={comment.id}
                    authorName={comment.authorName}
                    createdAt={comment.createdAt}
                    commentText={comment.note}
                    showEditControl={user.id === comment.author.id}
                    edited={comment.updatedAt}
                    commitChanges={updateNoteSubmit}
                  />
                ))
              ) : null}
            </Stack>
          </Grid>
        </Grid>
        <ConfirmDialog
          title={t("report:actions.cancelReportTitle")}
          contentText={t("report:actions.cancelReportText")}
          handleAgree={() => {
            if (adminNote) {
              cancelReportSubmit(id, adminNote);
            }
          }}
          handleClose={() => setCancelReport(false)}
          open={canselReport}
        >
          <TextField
            autoFocus
            margin="dense"
            label={t("report:reportAdminNoteLabel")}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setAdminNote(e.target.value as string)}
          />
        </ConfirmDialog>
      </Container>
    );
  }
};

export default Dashboard;
