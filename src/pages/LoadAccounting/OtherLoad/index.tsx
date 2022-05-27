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
  Tooltip,
  TableCell,
  Chip,
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
import {
  deleteOtherLoadItemById,
  fetchOtherLoadDataByUser,
} from "../../../http/report";
import FilterForm from "./components/FilterForm";
import SelectForm from "../../../components/SelectForm";
import { useAppSelector } from "../../../hooks/redux";

const OtherLoad: React.FC = () => {
  const classes = useStyles();

  const { t } = useTranslation(["common", "event", "report"], { i18n });

  const semester = useAppSelector((state) => state.semester);

  const [semesterId, setSemesterId] = useState(semester.list[0].id);

  const [otherLoadData, fetchOtherLoadData] = useAsyncFn(async (options) => {
    const { data } = await fetchOtherLoadDataByUser(options);
    return data;
  });

  useEffect(() => {
    fetchOtherLoadData({ semesterId });
  }, [fetchOtherLoadData, semesterId]);

  const [loadFormCreate, setLoadFormCreate] = useState(false);

  const columns: Column[] = [
    { id: "typeLabel", label: t("report:otherLoadType"), sortable: false },
    { id: "subjectName", label: t("report:subjectName"), sortable: false },
    {
      id: "duration",
      label: t("report:duration"),
      sortable: false,
      align: "center",
    },
    {
      id: "facultyName",
      label: t("report:faculty"),
      sortable: false,
      align: "center",
    },
    {
      id: "subGroupsLabels",
      label: t("report:subGroups"),
      sortable: false,
      renderCell: (row) =>
        row.subGroupsLabels?.length ? (
          <TableCell>
            <Stack direction={"row"} spacing={0.5} flexWrap={"wrap"}>
              {row.subGroupsLabels.map((g) => (
                <div style={{ margin: "2px 0" }}>
                  <Tooltip title={g.specialityName}>
                    <Chip label={g.label} />
                  </Tooltip>
                </div>
              ))}
            </Stack>
          </TableCell>
        ) : (
          <TableCell>{null}</TableCell>
        ),
    },
    {
      id: "studentsCount",
      label: t("report:studentsCount"),
      sortable: false,
      align: "center",
    },
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
        <IconButton
          color="error"
          onClick={() => deleteOtherLoadItemById(row.id)}
        >
          <DeleteIcon />
        </IconButton>
        <ModalWindow
          open={loadFormEdit}
          setOpen={() => setLoadFormEdit(!loadFormEdit)}
        >
          <LoadDataForm
            mode="edit"
            loadData={row}
            onDataSending={() => fetchOtherLoadData({ semesterId })}
            semesterId={semesterId}
          />
        </ModalWindow>
      </Stack>
    );
  };

  if (semesterId)
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.padding}>
              <Typography variant="h5">{t("report:otherLoadLabel")}</Typography>
              <SelectForm
                label={"Семестр"}
                handleChange={(e) => setSemesterId(e.target.value)}
                options={semester.list.map((s) => ({
                  label: s.name,
                  value: s.id,
                }))}
                value={semesterId}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <FilterForm
              fetchWithOptions={(options) => fetchOtherLoadData(options)}
              semesterId={semesterId}
            />
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
                onDataSending={() => fetchOtherLoadData({ semesterId })}
                semesterId={semesterId}
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
