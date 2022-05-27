import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TableCell,
  ButtonGroup,
  Button,
  IconButton,
} from "@mui/material";
import {
  OpenInNew as OpenInNewIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useStyles } from "./styles";
import { useAsyncFn } from "react-use";
import { getAcademicYears } from "../../http/semester";
import TableList from "../../components/TableList";
import { Column } from "../../components/TableList/typings";
import moment from "moment";
import ModalWindow from "../../components/ModalWindow";
import CreateForm from "./components/CreateForm";
import { useNavigate } from "react-router-dom";

const AcademicYear: React.FC = () => {
  const { t } = useTranslation(["common", "plan"], { i18n });
  const classes = useStyles();

  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = React.useState(false);

  const [years, fetchYears] = useAsyncFn(async () => {
    const res = await getAcademicYears();

    return res.data;
  });

  React.useEffect(() => {
    fetchYears();
  }, [fetchYears]);

  const columns: Column[] = [
    {
      id: "startDate",
      label: t("plan:academicYear.start"),
      sortable: false,
      renderCell: (row) => (
        <TableCell>{moment.utc(row.startDate).format("DD-MM-yyyy")}</TableCell>
      ),
    },
    {
      id: "endDate",
      label: t("plan:academicYear.end"),
      sortable: false,
      renderCell: (row) => (
        <TableCell>{moment.utc(row.endDate).format("DD-MM-yyyy")}</TableCell>
      ),
    },
    {
      id: "isArchived",
      label: t("plan:academicYear.state"),
      sortable: false,
      renderCell: (row) => (
        <TableCell>
          {row.isArchived
            ? t("plan:academicState.archived")
            : t("plan:academicState.nonArchived")}
        </TableCell>
      ),
    },
  ];

  const renderAction = (row) => {
    return (
      <IconButton color="primary" onClick={() => navigate(row.id)}>
        <OpenInNewIcon />
      </IconButton>
    );
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant={"h5"}>{t("common:academicYear")}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ButtonGroup>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setOpenCreate(true)}
              >
                {t("common:command.create")}
              </Button>
            </ButtonGroup>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TableList
            rows={years.value?.length ? years.value : []}
            columns={columns}
            isLoading={years.loading}
            renderActions={renderAction}
          />
        </Grid>
      </Grid>
      <ModalWindow
        open={openCreate}
        setOpen={() => setOpenCreate(!openCreate)}
        label={t("common:academicYear")}
      >
        <CreateForm />
      </ModalWindow>
    </Container>
  );
};

export default AcademicYear;
