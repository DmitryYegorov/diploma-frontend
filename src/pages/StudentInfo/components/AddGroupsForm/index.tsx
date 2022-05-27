import React from "react";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { addGroups } from "../../../../http/group";
import { useAsyncFn } from "react-use";

type Props = {
  semesterId: string;
  specialities: Array<any>;
  fetchData?: () => Promise<void | any>;
};

const AddGroupsForm: React.FC<Props> = ({
  semesterId,
  specialities,
  fetchData,
}) => {
  const { handleSubmit, register, setValue } = useForm();

  React.useEffect(() => {
    register("course");
    register("group");
    register("subGroupsCount");
    register("specialityId");
  }, [register]);

  const submitGroupData = async (data) => {
    const request = { ...data, semesterId };
    const res = await Promise.all([addGroups(request), fetchData()]);
  };

  const [state, sentData] = useAsyncFn(submitGroupData);

  return (
    <div style={{ minWidth: 350 }}>
      <Stack spacing={1}>
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
          label={"Кол-во подгрупп"}
          type={"number"}
          onChange={(e) => {
            setValue("subGroupsCount", parseInt(e.target.value));
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
        <Autocomplete
          id="tags-standard"
          options={specialities}
          getOptionLabel={(option) => option.name}
          fullWidth
          onChange={(event, newValue) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setValue("specialityId", newValue.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Специальность"
              fullWidth
              size={"small"}
            />
          )}
        />
        <LoadingButton
          loading={state.loading}
          loadingPosition={"start"}
          variant="contained"
          onClick={handleSubmit(sentData)}
        >
          Добавить
        </LoadingButton>
      </Stack>
    </div>
  );
};

export default AddGroupsForm;
