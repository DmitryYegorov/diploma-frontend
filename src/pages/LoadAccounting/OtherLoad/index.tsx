import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Stack,
  Button,
  IconButton,
  Box,
  Collapse,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useStyles } from "./styled";
import { useTranslation } from "react-i18next";

import i18n from "../../../i18n";
import moment from "moment";
import { EventType } from "../../../typings/enum";
import TableList from "../../../components/TableList";
import { Column } from "../../../components/TableList/typings";
import ModalWindow from "../../../components/ModalWindow";
import LoadDataForm from "./components/LoadDataForm";
import { useAsyncFn } from "react-use";
import { fetchOtherLoadDataByUser } from "../../../http/report";
import FilterForm from "./components/FilterForm";

const OtherLoad: React.FC = () => {
  const classes = useStyles();

  const { t } = useTranslation(["common", "event", "report"], { i18n });

  const [otherLoadData, fetchOtherLoadData] = useAsyncFn(async (options) => {
    const { data } = await fetchOtherLoadDataByUser(options);
    return data;
  });

  useEffect(() => {
    fetchOtherLoadData({ a: 5 });
  }, [fetchOtherLoadData]);

  const [loadFormCreate, setLoadFormCreate] = useState(false);
  const [options, setOptions] = useState({});

  const columns: Column[] = [
    { id: "typeLabel", label: t("report:otherLoadType"), sortable: false },
    { id: "subjectName", label: t("report:subjectName"), sortable: false },
    { id: "duration", label: t("report:duration"), sortable: false },
    { id: "facultyName", label: t("report:faculty"), sortable: false },
    { id: "groupsCount", label: t("report:subgroupsCount"), sortable: false },
    { id: "studentsCount", label: t("report:studentsCount"), sortable: false },
    { id: "dateLabel", label: t("report:dateMark"), sortable: false },
    { id: "createdAt", label: t("report:createdAt"), sortable: false },
  ];

  const Actions = (row) => {
    const [loadFormEdit, setLoadFormEdit] = useState(false);

    return (
      <Stack direction="row" spacing={1}>
        <IconButton
          color="primary"
          onClick={() => setLoadFormEdit(!loadFormEdit)}
        >
          <EditIcon />
        </IconButton>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
        <ModalWindow
          open={loadFormEdit}
          setOpen={() => setLoadFormEdit(!loadFormEdit)}
        >
          <LoadDataForm
            mode="edit"
            loadData={row}
            onDataSending={() => fetchOtherLoadData(options)}
          />
        </ModalWindow>
      </Stack>
    );
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.padding}>
            <Typography variant="h5">{t("report:otherLoadLabel")}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <FilterForm />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setLoadFormCreate(!loadFormCreate)}
          >
            {t("report:addLoadItem")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Collapse orientation="vertical" in={loadFormCreate}>
            <LoadDataForm
              mode="create"
              onDataSending={() => fetchOtherLoadData(options)}
            />
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <TableList<any>
            columns={columns}
            rows={
              otherLoadData.value
                ? otherLoadData.value.map((load) => ({
                    ...load,
                    typeLabel: t(`event:${load.type as EventType}`),
                    dateLabel: moment(load.date).format("MMMM-yyyy"),
                    createdAt: moment(load.createdAt).format("DD-MM-yyyy"),
                  }))
                : []
            }
            isLoading={otherLoadData.loading}
            renderActions={(row) => <Actions {...row} />}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default OtherLoad;
