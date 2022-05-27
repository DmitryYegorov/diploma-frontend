import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Container,
  Stack,
  Typography,
  Box,
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Autocomplete,
  Button,
  TableCell,
  Chip,
  Tooltip,
  IconButton,
  AccordionActions,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAsyncFn } from "react-use";
import {
  addLoadPlanItem,
  deleteLoadPlanItemById,
  fetchActiveTeachers,
  getLoadPlanListByOptions,
} from "../../../http/load-plan";
import { getAcademicYear } from "../../../http/semester";
import moment from "moment";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { getSubjectsList } from "../../../http/subject";
import toast from "react-hot-toast";

import SelectForm from "../../../components/SelectForm";
import { EventType } from "../../../typings/enum";
import {
  getGroupsWithSubGroupsAndFaculties,
  getSpecialitiesWithCourse,
} from "../../../http/group";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchGroupsWithFacultiesAction } from "../../../store/reducers/Group/ActionCreators";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import PlanedLoadTable from "./components/PlanedLoadTable";
import TableList from "../../../components/TableList";
import { Column } from "../../../components/TableList/typings";
import { loadTypeMap } from "../../../helpers";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import ModalWindow from "../../../components/ModalWindow";
import LoadDataForm from "../../LoadAccounting/OtherLoad/components/LoadDataForm";

type TeacherLoadItemProps = {
  firstName: string;
  lastName: string;
  middleName: string;
  teacherId: string;
  semesters: Array<any>;
};

const TeacherLoadItem: React.FC<TeacherLoadItemProps> = ({
  firstName,
  middleName,
  lastName,
  teacherId,
  semesters,
}) => {
  const { t } = useTranslation(["common", "plan", "event"], { i18n });

  const { register, handleSubmit, setValue } = useForm();

  const LoadOptions = [
    { label: t("event:EXAM"), value: EventType.EXAM },
    { label: t("event:CONSULTATION"), value: EventType.CONSULTATION },
    { label: t("event:COURSE_WORK"), value: EventType.COURSE_WORK },
    { label: t("event:CREDIT"), value: EventType.CREDIT },
    { label: t("event:POSTGRADUATE"), value: EventType.POSTGRADUATE },
    { label: t("event:TESTING"), value: EventType.TESTING },
    { label: t("event:PRACTICE"), value: EventType.PRACTICE },
    { label: t("event:DIPLOMA_DESIGN"), value: EventType.DIPLOMA_DESIGN },
    {
      label: t("event:STATE_EXAMINATION_BOARD"),
      value: EventType.STATE_EXAMINATION_BOARD,
    },
  ];

  const [semesterId, setSemesterId] = React.useState(semesters[1].id);

  const [displayMode, setDisplayMode] = React.useState<"read" | "edit">("read");

  const [subjects, fetchSubjects] = useAsyncFn(async () => {
    const res = await getSubjectsList();
    return res.data;
  });
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state) => state.group);

  React.useEffect(() => {
    fetchSubjects();
    dispatch(fetchGroupsWithFacultiesAction());
  }, [fetchSubjects]);

  React.useEffect(() => {
    register("subjectId");
    register("type", { required: true });
    register("duration", { required: true });
    register("groups", { required: true });
  }, [register]);

  const [addLoadPlanItemState, addLoadPlanItemSubmit] = useAsyncFn(
    async (data) => {
      try {
        const loadPlan = {
          type: data.type,
          subjectId: data.subjectId,
          duration: +data.duration,
        };
        const res = await addLoadPlanItem({
          loadPlan: {
            ...loadPlan,
            semesterId,
            teacherId,
          },
          groups: data.groups.map((g) => g.id),
        });
        toast.success("Ok");
        return res.data;
      } catch (e) {
        toast.error(e.message);
      }
    }
  );

  const [loadPlanList, fetchLoadPlanList] = useAsyncFn(async (options) => {
    const res = await getLoadPlanListByOptions(options);

    return res.data;
  }, []);

  const [deleteState, deleteLoadPlanItemSubmit] = useAsyncFn(async (id) => {
    const res = await deleteLoadPlanItemById(id);
    await fetchLoadPlanList({ teacherId, semesterId });

    return res.data;
  });

  const [semesterChanged, setSemesterChanged] = React.useState(true);

  React.useEffect(() => {
    fetchLoadPlanList({
      semesterId,
      teacherId,
    });
  }, [semesterChanged, fetchLoadPlanList]);

  const columns: Column[] = [
    { id: "subjectName", label: "Дисциплина" },
    {
      id: "type",
      label: "Вид нагрузки",
      renderCell: (row) => (
        <TableCell>
          <Typography>{loadTypeMap[row.type]}</Typography>
        </TableCell>
      ),
    },
    { id: "duration", label: "Кол-во часов" },
    {
      id: "subGroupsLabels",
      label: "Подгруппы",
      renderCell: (row) => (
        <TableCell>
          <Stack spacing={0.5} direction="row" flexWrap="wrap">
            {row.subGroupsLabels.map((sg) => (
              <Tooltip title={sg.specialityName}>
                <Chip label={sg.label} />
              </Tooltip>
            ))}
          </Stack>
        </TableCell>
      ),
    },
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
          onClick={() => deleteLoadPlanItemSubmit(row.id)}
          disabled={deleteState.loading}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    );
  };

  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="h6">{`${firstName} ${middleName[0]}. ${lastName[0]}`}</Typography>
      </AccordionSummary>
      <AccordionActions>
        <SelectForm
          label={"Семестр"}
          handleChange={(e) => {
            setSemesterId(e.target.value);
            setDisplayMode(displayMode === "read" ? "edit" : "read");
            setDisplayMode(displayMode === "read" ? "edit" : "read");
            setSemesterChanged(!semesterChanged);
          }}
          options={semesters.map((s) => ({
            label: s.name,
            value: s.id,
          }))}
          value={semesterId}
        />
      </AccordionActions>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Режим</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={displayMode}
                onChange={(e) =>
                  setDisplayMode(e.target.value as "read" | "edit")
                }
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="read"
                  control={<Radio />}
                  label="Просмотр"
                />
                <FormControlLabel
                  value="edit"
                  control={<Radio />}
                  label="Редактирование"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {displayMode === "edit" ? (
            <>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1} justifyItems="space-around">
                  <SelectForm
                    label={"Дисциплина"}
                    options={
                      subjects.value?.list
                        ? subjects.value.list.map((s) => ({
                            label: s.name,
                            value: s.id,
                          }))
                        : []
                    }
                    handleChange={(e) => setValue("subjectId", e.target.value)}
                    loading={subjects.loading}
                  />
                  <SelectForm
                    label={"Тип"}
                    handleChange={(e) => setValue("type", e.target.value)}
                    options={LoadOptions}
                  />
                  <TextField
                    label={"Кол-во часов"}
                    inputProps={{ min: 0 }}
                    type={"number"}
                    style={{ minWidth: 100 }}
                    onChange={(e) => setValue("duration", e.target.value)}
                  />
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={groups.list}
                    getOptionLabel={(option: any) => option.label}
                    fullWidth
                    onChange={(event, newValue) => setValue("groups", newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Группы"
                        placeholder="Favorites"
                        fullWidth
                      />
                    )}
                  />
                  <LoadingButton
                    variant="contained"
                    style={{ minWidth: 100 }}
                    loading={addLoadPlanItemState.loading}
                    onClick={handleSubmit(addLoadPlanItemSubmit)}
                  >
                    Добавить
                  </LoadingButton>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <TableList
                  rows={loadPlanList.value}
                  isLoading={loadPlanList.loading}
                  columns={columns}
                  renderActions={(row) => <Actions {...row} />}
                />
              </Grid>
            </>
          ) : (
            <PlanedLoadTable teacherId={teacherId} semesterId={semesterId} />
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const PlanLoad: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation(["common", "plan"], { i18n });

  const [teachers, fetchTeachers] = useAsyncFn(async () => {
    const res = await fetchActiveTeachers();

    return res.data;
  });

  const [academicYear, fetchAcademicYear] = useAsyncFn(async (academicId) => {
    const res = await getAcademicYear(academicId);

    return res.data;
  });

  React.useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);
  React.useEffect(() => {
    if (id) {
      fetchAcademicYear(id);
    }
  }, [fetchAcademicYear]);

  if (academicYear.loading)
    return (
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (academicYear.value)
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" noWrap>{`${t(
              "common:academicYear"
            )} (${moment(academicYear.value.startDate).format(
              "DD-MM-yyyy"
            )} - ${moment(academicYear.value.endDate).format(
              "DD-MM-yyyy"
            )})`}</Typography>
          </Grid>
          <Grid item xs={12}>
            {teachers.loading ? (
              <CircularProgress />
            ) : (
              <Stack>
                {!!teachers.value?.length &&
                  teachers.value.map((teacher) => (
                    <TeacherLoadItem
                      firstName={teacher.firstName}
                      lastName={teacher.lastName}
                      middleName={teacher.middleName}
                      teacherId={teacher.id}
                      semesters={academicYear.value.semesters}
                    />
                  ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>
    );
};

export default PlanLoad;
