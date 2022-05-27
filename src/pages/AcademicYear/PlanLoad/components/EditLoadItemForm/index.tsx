import React from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";
import SelectForm from "../../../../../components/SelectForm";
import { loadTypeMap } from "../../../../../helpers";
import { LoadingButton } from "@mui/lab";
import { useForm, useWatch } from "react-hook-form";
import { useAsyncFn } from "react-use";
import { editLoadPlanItem } from "../../../../../http/load-plan";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

type Props = {
  groups: any;
  subjects: any;
  editData: any;
  invoke: () => Promise<void>;
};

const EditLoadItemForm: React.FC<Props> = ({
  subjects,
  groups,
  editData,
  invoke,
}) => {
  const { setValue, register, handleSubmit, control } = useForm({
    defaultValues: {
      subjectId: editData.subjectId,
      type: editData.type,
      duration: editData.duration,
      groups: editData.subGroupsLabels.map((g) => g.id),
    },
  });

  const watch = useWatch({ control });

  React.useEffect(() => {
    register("subjectId");
    register("type", { required: true });
    register("duration", { required: true });
    register("groups", { required: true });
  }, [register]);

  const [state, submitEdit] = useAsyncFn(async (data) => {
    try {
      const request = {
        groups: data.groups,
        newData: {
          type: data.type,
          subjectId: data.subjectId,
          duration: +data.duration,
        },
      };
      const res = await editLoadPlanItem(editData.id, request);

      toast.success("Изменения внесены успешно");
      await invoke();
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error((e as AxiosError).response.data.message);
      }
    }
  });

  // eslint-disable-next-line no-console
  console.log(watch);

  return (
    <Stack spacing={1}>
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
        value={watch.subjectId}
      />
      <SelectForm
        label={"Тип"}
        handleChange={(e) => setValue("type", e.target.value)}
        options={Object.keys(loadTypeMap).map((type) => ({
          label: loadTypeMap[type],
          value: type,
        }))}
        value={watch.type}
      />
      <TextField
        label={"Часы"}
        inputProps={{ min: 0 }}
        type={"number"}
        style={{ minWidth: 100 }}
        onChange={(e) => setValue("duration", e.target.value)}
        value={watch.duration}
      />
      <Autocomplete
        multiple
        id="tags-standard"
        options={groups.list}
        getOptionLabel={(option: any) => option.label}
        style={{ maxWidth: 300 }}
        onChange={(event, newValue) =>
          setValue(
            "groups",
            newValue.map((nv) => nv.id)
          )
        }
        value={groups.list.filter((item) => watch.groups.includes(item.id))}
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
        loading={state.loading}
        onClick={handleSubmit(submitEdit)}
      >
        Готово
      </LoadingButton>
    </Stack>
  );
};

export default EditLoadItemForm;
