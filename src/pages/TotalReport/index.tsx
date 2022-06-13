import React from "react";
import {
  Container,
  Typography,
  Grid,
  TableCell,
  Stack,
  IconButton,
} from "@mui/material";
import { OpenInNew as OpenInNewIcon } from "@mui/icons-material";
import { useAsyncFn } from "react-use";
import { fetchAllTotalReportList } from "../../http/report";
import { Column } from "../../components/TableList/typings";
import TableList from "../../components/TableList";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const TotalReportPage: React.FC = () => {
  const { t } = useTranslation(["common", "report"], { i18n });

  const navigate = useNavigate();

  const [state, fetchReports] = useAsyncFn(async () => {
    const res = await fetchAllTotalReportList();

    return res.data;
  });

  React.useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const columns: Column[] = [
    { id: "name", label: "Название", sortable: false },
    {
      id: "type",
      label: t("report:reportType.label"),
      sortable: false,
      renderCell: (row) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return <TableCell>{t(`report:reportType.${row.type}`)}</TableCell>;
      },
    },
    { id: "createdName", label: "Создатель", sortable: false },
    {
      id: "createdAt",
      label: "Собран",
      renderCell: (row) => (
        <TableCell>{moment.utc(row.createdAt).format("DD/MM/yyyy")}</TableCell>
      ),
    },
  ];

  const renderActions = (row) => (
    <Stack direction="row">
      <IconButton color={"primary"} onClick={() => navigate(row.id)}>
        <OpenInNewIcon />
      </IconButton>
    </Stack>
  );

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant={"h2"}>Итоговые отчёты</Typography>
        </Grid>
        <Grid item xs={12}>
          <TableList
            rows={state.value ? state.value : []}
            columns={columns}
            isLoading={state.loading}
            renderActions={renderActions}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TotalReportPage;
