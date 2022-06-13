import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import { useForm, useWatch } from "react-hook-form";
import { useAsyncFn } from "react-use";
import { getSubjectsList } from "../../../../../http/subject";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { fetchGroupsWithFacultiesAction } from "../../../../../store/reducers/Group/ActionCreators";
import {
  addLoadPlanItem,
  deleteLoadPlanItemById,
  getLoadPlanByOptions,
  getLoadPlanListByOptions,
} from "../../../../../http/load-plan";
import toast from "react-hot-toast";
import { Column } from "../../../../../components/TableList/typings";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TableCell,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { loadTypeMap } from "../../../../../helpers";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import SelectForm from "../../../../../components/SelectForm";
import { LoadingButton } from "@mui/lab";
import TableList from "../../../../../components/TableList";
import MonthLoadMappedTable from "../../../../../components/MonthLoadMappedTable";
import ModalWindow from "../../../../../components/ModalWindow";
import EditLoadItemForm from "../EditLoadItemForm";
import axios, { AxiosError } from "axios";
import { fetchSpecialitiesList } from "../../../../../http/group";

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

  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      semesterId: semesters[0].id,
      subjectId: null,
      type: null,
      duration: 0,
      subgroupsCount: 0,
      specialityId: "",
      course: 0,
    },
  });
  const watch = useWatch({ control });
  const { semesterId } = watch;

  // eslint-disable-next-line no-console
  console.log(watch);

  const [displayMode, setDisplayMode] = React.useState<"read" | "edit">("read");

  const [subjects, fetchSubjects] = useAsyncFn(async () => {
    const res = await getSubjectsList();
    return res.data;
  });
  const [specialities, fetchSpecialities] = useAsyncFn(async () => {
    const res = await fetchSpecialitiesList();

    return res.data;
  });

  React.useEffect(() => {
    fetchSubjects();
    fetchSpecialities();
  }, [fetchSubjects, displayMode]);

  React.useEffect(() => {
    register("subjectId");
    register("type", { required: true });
    register("duration", { required: true });
    register("subgroupsCount", { required: true });
    register("specialityId", { required: true });
    register("semesterId", { required: true });
    register("course", { required: true });
  }, [register]);

  const [loadPlanState, fetchLoadPlan] = useAsyncFn(async (options) => {
    const list = await getLoadPlanListByOptions(options);
    const mapped = await getLoadPlanByOptions(options);

    return { list: list.data, mapped: mapped.data };
  }, []);

  const [addLoadPlanItemState, addLoadPlanItemSubmit] = useAsyncFn(
    async (data) => {
      try {
        const loadPlan = {
          type: data.type,
          subjectId: data.subjectId,
          duration: +data.duration,
          course: +data.course,
          subgroupsCount: +data.subgroupsCount,
          specialityId: data.specialityId,
        };
        const res = await addLoadPlanItem({
          ...loadPlan,
          semesterId,
          teacherId,
        });
        await fetchLoadPlan({ teacherId, semesterId });
        toast.success("Ok");
        return res.data;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const { response } = e as AxiosError;
          toast.error(response.data.message);
        }
      }
    },
    [semesterId]
  );

  const [deleteState, deleteLoadPlanItemSubmit] = useAsyncFn(async (id) => {
    const res = await deleteLoadPlanItemById(id);
    await fetchLoadPlan({ teacherId, semesterId });

    return res.data;
  });

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
      id: "subgroupsCount",
      label: "Подгруппы",
    },
    { id: "facultyName", label: "Факультет" },
    {
      id: "specialityName",
      label: "Специальность",
    },
  ];

  const Actions = (row) => {
    const [loadFormEdit, setLoadFormEdit] = useState(false);

    return (
      <Stack direction="row" spacing={1}>
        <IconButton color="primary" onClick={() => setLoadFormEdit(true)}>
          <EditIcon />
        </IconButton>
        <ModalWindow
          open={loadFormEdit}
          setOpen={() => setLoadFormEdit(!loadFormEdit)}
          label={`${row.subjectName}, ${
            row.subjectName === row.type ? null : loadTypeMap[row.type]
          }`}
        >
          <EditLoadItemForm
            specialities={specialities?.value ? specialities.value : []}
            subjects={subjects}
            editData={row}
            invoke={async () => {
              fetchLoadPlan({ semesterId, teacherId });
            }}
          />
        </ModalWindow>
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
    <Accordion
      onChange={() => {
        fetchLoadPlan({ semesterId, teacherId });
        setDisplayMode("edit");
      }}
    >
      <AccordionSummary>
        <Typography variant="h6">{`${firstName} ${middleName[0]}. ${lastName[0]}`}</Typography>
      </AccordionSummary>
      <AccordionActions>
        <SelectForm
          label={"Семестр"}
          handleChange={async (e) => {
            await fetchLoadPlan({ semesterId: e.target.value, teacherId });
            setValue("semesterId", e.target.value);
          }}
          options={semesters.map((s) => ({
            label: s.name,
            value: s.id,
          }))}
          value={semesterId}
        />
      </AccordionActions>
      <AccordionDetails>
        {semesterId ? (
          <Grid container>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Режим</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={displayMode}
                  onChange={async (e) => {
                    setDisplayMode(e.target.value as "read" | "edit");
                    await fetchLoadPlan({ semesterId, teacherId });
                  }}
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
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyItems="space-around"
                  >
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
                      handleChange={(e) =>
                        setValue("subjectId", e.target.value)
                      }
                      loading={subjects.loading}
                    />
                    <SelectForm
                      label={"Тип"}
                      handleChange={(e) => setValue("type", e.target.value)}
                      options={Object.keys(loadTypeMap).map((type) => ({
                        label: loadTypeMap[type],
                        value: type,
                      }))}
                    />
                    <Autocomplete
                      id="tags-standard"
                      options={
                        specialities?.value
                          ? specialities.value.map((sp) => ({
                              value: sp.id,
                              label: sp.name,
                            }))
                          : []
                      }
                      getOptionLabel={(option: any) => option.label}
                      fullWidth
                      onChange={(event, newValue) =>
                        setValue("specialityId", newValue.value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Специальность"
                          fullWidth
                        />
                      )}
                    />
                    <TextField
                      label={"Курс"}
                      fullWidth
                      inputProps={{ min: 1 }}
                      type="number"
                      onChange={(e) => setValue("course", +e.target.value)}
                      style={{ minWidth: 70 }}
                    />
                    <TextField
                      label={"Кол-во подгрупп"}
                      inputProps={{ min: 1 }}
                      type="number"
                      onChange={(e) =>
                        setValue("subgroupsCount", +e.target.value)
                      }
                      style={{ minWidth: 100 }}
                    />
                    <TextField
                      label={"Часы"}
                      inputProps={{ min: 0 }}
                      type={"number"}
                      style={{ minWidth: 70 }}
                      onChange={(e) => setValue("duration", +e.target.value)}
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
                    rows={loadPlanState.value ? loadPlanState.value.list : []}
                    isLoading={loadPlanState.loading}
                    columns={columns}
                    renderActions={(row) => <Actions {...row} />}
                  />
                </Grid>
              </>
            ) : (
              <MonthLoadMappedTable
                loading={loadPlanState.loading}
                data={loadPlanState.value?.mapped || []}
                teacherName={`${firstName} ${middleName[0]}. ${lastName[0]}`}
              />
            )}
          </Grid>
        ) : null}
      </AccordionDetails>
    </Accordion>
  );
};

export default TeacherLoadItem;
