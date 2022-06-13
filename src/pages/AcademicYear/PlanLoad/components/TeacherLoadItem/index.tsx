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
      groups: [],
    },
  });
  const { semesterId } = useWatch({ control });

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
  }, [fetchSubjects, displayMode]);

  React.useEffect(() => {
    register("subjectId");
    register("type", { required: true });
    register("duration", { required: true });
    register("groups", { required: true });
    register("semesterId", { required: true });
  }, [register]);

  const [loadPlanList, fetchLoadPlanList] = useAsyncFn(async (options) => {
    const res = await getLoadPlanListByOptions(options);

    return res.data;
  }, []);

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
        await fetchLoadPlanList({ teacherId, semesterId });
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

  const [state, fetchLoadPlaned] = useAsyncFn(async (options) => {
    const res = await getLoadPlanByOptions(options);

    return res.data;
  });

  const [deleteState, deleteLoadPlanItemSubmit] = useAsyncFn(async (id) => {
    const res = await deleteLoadPlanItemById(id);
    await fetchLoadPlanList({ teacherId, semesterId });

    return res.data;
  });

  React.useEffect(() => {
    fetchLoadPlanList({
      semesterId,
      teacherId,
    });
    fetchLoadPlaned({ teacherId, semesterId });
    setDisplayMode("edit");
  }, [semesterId, fetchLoadPlanList]);

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
          {row.subGroupsLabels.map((sg) => (
            <div style={{ padding: 3 }}>
              <Tooltip title={sg.specialityName}>
                <Chip label={sg.label} />
              </Tooltip>
            </div>
          ))}
        </TableCell>
      ),
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
            groups={groups}
            subjects={subjects}
            editData={row}
            invoke={() => fetchLoadPlanList({ semesterId, teacherId })}
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
    <Accordion>
      <AccordionSummary>
        <Typography variant="h6">{`${firstName} ${middleName[0]}. ${lastName[0]}`}</Typography>
      </AccordionSummary>
      <AccordionActions>
        <SelectForm
          label={"Семестр"}
          handleChange={(e) => {
            setValue("semesterId", e.target.value);
            // eslint-disable-next-line no-console
            console.log(semesterId);
            setDisplayMode("read");
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
                    <TextField
                      label={"Часы"}
                      inputProps={{ min: 0 }}
                      type={"number"}
                      style={{ minWidth: 100 }}
                      onChange={(e) => setValue("duration", +e.target.value)}
                    />
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={groups.list}
                      getOptionLabel={(option: any) => option.label}
                      fullWidth
                      onChange={(event, newValue) =>
                        setValue("groups", newValue)
                      }
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
                    rows={loadPlanList.value ? loadPlanList.value : []}
                    isLoading={loadPlanList.loading}
                    columns={columns}
                    renderActions={(row) => <Actions {...row} />}
                  />
                </Grid>
              </>
            ) : (
              <MonthLoadMappedTable
                loading={state.loading}
                data={state.value || []}
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
