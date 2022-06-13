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
} from "@mui/material";
import {
  DoneOutline as DoneOutlineIcon,
  HighlightOff as HighlightOffIcon,
} from "@mui/icons-material";
import LoadReportTable from "../../../components/LoadReportTable";
import ListClasses from "../../ReportPage/components/ListClasses";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import SpeedDialMenu from "../../../components/SpeedDialMenu";
import {
  approveReport,
  cancelReport,
  getMappedMonthReport,
} from "../../../http/report";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useAsyncFn } from "react-use";
import MonthLoadMappedTable from "../../../components/MonthLoadMappedTable";
import moment from "moment";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["common", "report"], { i18n });

  const { id } = useParams();

  const { selectedReport, reportData } = useAppSelector(
    (state) => state.report
  );

  const [canselReport, setCancelReport] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [mapped, fetchMapped] = useAsyncFn(async (reportId) => {
    const res = await getMappedMonthReport(reportId);

    return res.data;
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchOneReportAction(id));
      fetchMapped(id);
    }
  }, [dispatch]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const reportType = t(`report:reportType.${selectedReport.type}`);
  const reportPeriod = `${selectedReport.startDate} - ${selectedReport.endDate}`;

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper style={{ padding: 10 }}>
            <Stack direction="row" spacing={2}>
              <Typography variant={"h5"}>
                {selectedReport.createdBy} / {reportPeriod}
              </Typography>
              <Chip label={reportType} />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <SpeedDialMenu
            actions={[
              {
                key: "approve",
                icon: <DoneOutlineIcon color="success" />,
                tooltipTitle: t("report:approveReport"),
                handleClick: () => {
                  approveReport(selectedReport.id);
                },
              },
              {
                key: "cancel",
                icon: <HighlightOffIcon color="error" />,
                tooltipTitle: t("report:approveReport"),
                handleClick: () => setCancelReport(!canselReport),
              },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <MonthLoadMappedTable data={mapped.value} loading={mapped.loading} />
        </Grid>
        <Grid item xs={12}>
          <ListClasses loadData={reportData} reportId={selectedReport.id} />
        </Grid>
      </Grid>
      <ConfirmDialog
        title={t("report:actions.cancelReportTitle")}
        contentText={t("report:actions.cancelReportText")}
        handleAgree={() => {
          if (adminNote) {
            cancelReport(selectedReport.id, adminNote);
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
    </>
  );
};

export default Dashboard;
