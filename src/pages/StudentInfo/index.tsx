import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  TextField,
  Button,
} from "@mui/material";
import {
  FilterAlt as FilterAltIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import TableList from "../../components/TableList";
import ModalWindow from "../../components/ModalWindow";

import { useStyles } from "./styled";
import { useAsyncFn } from "react-use";
import {
  fetchFacultiesList,
  fetchGroupsByOptions,
  fetchSpecialitiesList,
} from "../../http/group";
import { Column } from "../../components/TableList/typings";
import SelectForm from "../../components/SelectForm";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchSemestersAction } from "../../store/reducers/Semester/ActionCreators";
import AddGroupForm from "./components/AddGroupsForm";
import toast from "react-hot-toast";

const StudentInfo: React.FC = () => {
  const { t } = useTranslation(["common"], { i18n });
  const classes = useStyles();

  const { selectedSemester, list } = useAppSelector((state) => state.semester);

  const [selectedFaculty, setSelectedFaculty] = React.useState("");
  const [semesterId, setSemesterId] = React.useState(selectedSemester.id);
  const [openAddGroup, setOpenAddGroup] = React.useState(false);

  const { register, setValue, handleSubmit } = useForm();
  const dispatch = useAppDispatch();

  const [info, fetchInfo] = useAsyncFn(async () => {
    const [facultyRes, specialityRes] = await Promise.all([
      fetchFacultiesList(),
      fetchSpecialitiesList(),
    ]);
    return { faculties: facultyRes.data, specialities: specialityRes.data };
  });

  const [groups, fetchGroups] = useAsyncFn(async (options) => {
    try {
      if (!semesterId) {
        throw new Error("Необходимо выбрать семестр!");
      }
      const res = await fetchGroupsByOptions({ ...options, semesterId });
      return res.data;
    } catch (e) {
      toast.error(e.message);
    }
  });

  React.useEffect(() => {
    dispatch(fetchSemestersAction());
    fetchInfo();
    fetchGroups({ semesterId });
  }, [fetchInfo, dispatch]);

  React.useEffect(() => {
    register("course");
    register("group");
    register("specialityId");
  });

  const facultiesColumns: Column[] = [
    { id: "name", label: "Факультет", sortable: false },
    { id: "shortName", label: "Алиас", sortable: false },
  ];

  const specialityColumns: Column[] = [
    { id: "name", label: "Название", sortable: false },
    { id: "shortName", label: "Алиас", sortable: false },
    { id: "facultyName", label: "Факультет", sortable: false },
  ];

  const groupsColumns: Column[] = [
    { id: "course", label: "Курс", sortable: false },
    { id: "group", label: "Группа", sortable: false },
    { id: "subGroup", label: "Подгруппа", sortable: false },
    { id: "specialityName", label: "Специальность", sortable: false },
  ];

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Stack spacing={0.5}>
              <Typography variant="h5">{t("common:studentInfo")}</Typography>
              <SelectForm
                label={"Семестр"}
                handleChange={(e) => {
                  setSemesterId(e.target.value);
                  fetchGroups({ semesterId });
                }}
                options={list.map((s) => ({ label: s.name, value: s.id }))}
                value={semesterId}
              />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Stack>
            <Accordion>
              <AccordionSummary>
                <Typography>{t("common:faculties")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableList
                  columns={facultiesColumns}
                  rows={!!info.value ? info.value.faculties : []}
                  isLoading={info.loading}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>
                <Typography>{t("common:specialities")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableList
                  columns={specialityColumns}
                  rows={!!info.value ? info.value.specialities : []}
                  isLoading={info.loading}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
              <AccordionSummary>
                <Typography>{t("common:groups")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    justifyItems="space-around"
                    spacing={1}
                  >
                    <TextField
                      label={"Группа"}
                      type={"number"}
                      onChange={(e) => {
                        setValue("group", parseInt(e.target.value));
                      }}
                      inputProps={{ min: 1 }}
                      size="small"
                    />
                    <TextField
                      label={"Курс"}
                      type={"number"}
                      onChange={(e) => {
                        setValue("course", parseInt(e.target.value));
                      }}
                      inputProps={{ min: 1 }}
                      size="small"
                    />
                    <SelectForm
                      label={"Факультет"}
                      handleChange={(e) => setSelectedFaculty(e.target.value)}
                      options={
                        info.value
                          ? info.value.faculties.map((s) => ({
                              label: s.name,
                              value: s.id,
                            }))
                          : []
                      }
                      size="small"
                    />
                    <SelectForm
                      label={"Специальность"}
                      handleChange={(e) => {
                        setValue("specialityId", e.target.value);
                      }}
                      options={
                        info.value
                          ? info.value.specialities
                              .filter((s) =>
                                selectedFaculty
                                  ? s.facultyId === selectedFaculty
                                  : true
                              )
                              .map((s) => ({
                                label: s.name,
                                value: s.id,
                              }))
                          : []
                      }
                      size="small"
                    />
                    <Button
                      startIcon={<FilterAltIcon />}
                      variant="outlined"
                      size="small"
                      onClick={handleSubmit(fetchGroups)}
                    />
                  </Stack>
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={() => setOpenAddGroup(true)}
                  >
                    Добавить группы
                  </Button>
                  <TableList
                    columns={groupsColumns}
                    rows={!!groups.value ? groups.value : []}
                    isLoading={groups.loading}
                  />
                  <ModalWindow
                    open={openAddGroup}
                    setOpen={() => setOpenAddGroup(!openAddGroup)}
                    label={"Добавить подгруппы"}
                  >
                    <AddGroupForm
                      semesterId={semesterId}
                      specialities={info.value ? info.value.specialities : []}
                      fetchData={() =>
                        fetchGroups({ semesterId: selectedSemester.id })
                      }
                    />
                  </ModalWindow>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentInfo;
