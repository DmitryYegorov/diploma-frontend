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
  Tooltip,
  Checkbox,
  Link,
  ButtonGroup,
  useMediaQuery,
} from "@mui/material";
import {
  OpenInNew as OpenInNewIcon,
  CheckCircle as CheckCircleIcon,
  Brightness1 as BrightnessIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useStyles } from "./styled";
import { Column } from "../../components/TableList/typings";
import TableList from "../../components/TableList";
import { useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { fetchSentReports } from "../../http/report";
import moment from "moment";
import FilterForm from "./components/FilterForm";
import { ReportState } from "../../typings/enum";
import ModalWindow from "../../components/ModalWindow";
import CheckedReportModal from "./components/CheckedReportModal";

const reportStateIcon = {
  [ReportState.SENT]: (
    <Tooltip
      title={"Не проверен"}
      children={<BrightnessIcon color={"warning"} />}
    />
  ),
  [ReportState.APPROVED]: (
    <Tooltip title="Одобрен" children={<CheckCircleIcon color="success" />} />
  ),
};

const SentReports: React.FC = () => {
  const classes = useStyles();

  const [checkedReports, setCheckedReports] = React.useState<Array<string>>([]);

  const [sentReports, fetchSentReportsList] = useAsyncFn(
    async (options = {}) => {
      const res = await fetchSentReports(options);
      setCheckedReports([]);
      return res.data;
    }
  );

  useEffect(() => {
    fetchSentReportsList({});
  }, [fetchSentReportsList]);

  const navigate = useNavigate();

  const { t } = useTranslation(["common", "report"], { i18n });

  const columns: Column[] = [
    {
      id: "id",
      label: "",
      renderCell: (row) => (
        <TableCell>
          <Checkbox
            value={row.id}
            checked={checkedReports.includes(row.id)}
            disabled={row.state !== ReportState.APPROVED}
            onChange={(e) => {
              if (!e.target.checked) {
                setCheckedReports([
                  ...checkedReports.filter((id) => id !== e.target.value),
                ]);
              } else {
                setCheckedReports([...checkedReports, e.target.value]);
              }
            }}
          />
        </TableCell>
      ),
    },
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
    {
      id: "state",
      label: t("report:stateLabel"),
      sortable: false,
      renderCell: (row) => <TableCell>{reportStateIcon[row.state]}</TableCell>,
    },
  ];

  const [openCheckedModal, setOpenCheckedModal] = React.useState(false);

  const isDesktop = useMediaQuery("(min-width: 680px)");

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Paper className={classes.topMenu}>
            <Typography variant="h5">{t("report:sentReportsLabel")}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <FilterForm
            fetchWithOptions={(options) => fetchSentReportsList(options)}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction={isDesktop ? "row" : "column"}
            spacing={2}
            alignItems="center"
          >
            <Typography>
              <b>Выбрано:</b> {checkedReports.length}{" "}
              <Link
                href={"#"}
                onClick={() => {
                  if (checkedReports.length > 0) setCheckedReports([]);
                  else
                    setCheckedReports(
                      sentReports.value?.map((item) => item.id)
                    );
                }}
              >
                {checkedReports.length > 0 ? "Снять выделение" : "Выбрать всё"}
              </Link>
            </Typography>
            {checkedReports.length > 0 && (
              <ButtonGroup>
                <Button
                  variant={"outlined"}
                  onClick={() => setOpenCheckedModal(true)}
                >
                  Сформировать новый отчёт
                </Button>
              </ButtonGroup>
            )}
          </Stack>
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
          <ModalWindow
            open={openCheckedModal}
            setOpen={() => setOpenCheckedModal(!openCheckedModal)}
          >
            <CheckedReportModal
              checkedReports={sentReports.value
                ?.map((report) => ({
                  name: report.name,
                  createdBy: report.createdName,
                  periodLabel: `${moment
                    .utc(report.startDate)
                    .format("DD-MM-yyyy")} - ${moment
                    .utc(report.endDate)
                    .format("DD-MM-yyyy")}`,
                  id: report.id,
                }))
                .filter((r) => checkedReports.includes(r.id))}
            />
          </ModalWindow>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SentReports;
