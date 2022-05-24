import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Stack,
  Container,
  Typography,
  IconButton,
  TableCell,
} from "@mui/material";
import { OpenInNew as OpenInNewIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useStyles } from "./styled";
import { Column } from "../../components/TableList/typings";
import TableList from "../../components/TableList";
import { useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { fetchSentReports } from "../../http/report";
import moment from "moment";

const SentReports: React.FC = () => {
  const classes = useStyles();

  const [sentReports, fetchSentReportsList] = useAsyncFn(async () => {
    const res = await fetchSentReports();
    return res.data;
  });

  useEffect(() => {
    fetchSentReportsList();
  }, [fetchSentReportsList]);

  const navigate = useNavigate();

  const { t } = useTranslation(["common", "report"], { i18n });

  const columns: Column[] = [
    {
      id: "name",
      label: t("report:nameLabel"),
      sortable: false,
    },
    { id: "createdName", label: t("report:createdBy"), sortable: false },
    {
      id: "sentAt",
      label: t("report:sentAt"),
      sortable: false,
      renderCell: (row) => (
        <TableCell>{moment(row.sentAt).format("DD-MM-yyyy")}</TableCell>
      ),
    },
    {
      id: "startDate",
      label: t("report:startDate"),
      sortable: false,
      renderCell: (row) => (
        <TableCell>{moment(row.startDate).format("DD-MM-yyyy")}</TableCell>
      ),
    },
    {
      id: "endDate",
      label: t("report:endDate"),
      sortable: false,
      renderCell: (row) => (
        <TableCell>{moment(row.endDate).format("DD-MM-yyyy")}</TableCell>
      ),
    },
  ];

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Paper className={classes.topMenu}>
            <Typography variant="h5">{t("report:sentReportsLabel")}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TableList
            rows={sentReports.value ? sentReports.value : []}
            columns={columns}
            renderActions={(row) => (
              <IconButton color="primary" onClick={() => navigate(`${row.id}`)}>
                <OpenInNewIcon />
              </IconButton>
            )}
            isLoading={sentReports.loading}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SentReports;
