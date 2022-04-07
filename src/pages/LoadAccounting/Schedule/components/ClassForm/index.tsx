import * as React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Stack,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { useEffect, useState } from "react";
import { fetchSubjectsAction } from "../../../../../store/reducers/Subject/ActionCreators";
import { Save as SaveIcon } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import SelectAutoComplete from "../../../../../components/SelectAutoComplete";
import { fetchRoomsAction } from "../../../../../store/reducers/Room/ActionCreators";
import { Room } from "../../../../../models/Room";

const CellForm: React.FC = () => {
  const rootState = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [weekly, setWeekly] = useState(false);

  const { control, handleSubmit } = useForm();

  const {} = rootState;
  useEffect(() => {
    if (!rootState.subject.isLoading && !rootState.room.isLoading) {
      Promise.all([
        dispatch(fetchSubjectsAction()),
        dispatch(fetchRoomsAction()),
      ]);
    }
  }, [dispatch]);

  return (
    <Stack width={"600px"} spacing={2}>
      <Stack direction="row" spacing={2}>
        <FormControl variant="standard" sx={{ width: 250 }}>
          <InputLabel id="subject1">1-я неделя</InputLabel>
          <Select labelId="subject1" id="subjectSelect2" label="Дисциплина">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {rootState.subject.list &&
              rootState.subject.list.map((subject) => (
                <MenuItem value={subject.id}>{subject.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={weekly}
              onChange={() => setWeekly(!weekly)}
            />
          }
          label="Каждую неделю"
        />
      </Stack>
      <Stack direction="row" spacing={3}>
        <FormControl variant="standard" sx={{ width: 250 }} disabled={weekly}>
          <InputLabel id="subject2">2-я неделя</InputLabel>
          <Select labelId="subject2" id="subjectSelect2">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {rootState.subject.list &&
              rootState.subject.list.map((subject) => (
                <MenuItem value={subject.shortName}>{subject.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Stack>
      <Box>
        <SelectAutoComplete
          options={rootState.room.list}
          keyLabel={"room"}
          label={"Аудитория"}
        />
      </Box>
      <Box>
        <Button startIcon={<SaveIcon />} variant="contained">
          Сохранить
        </Button>
      </Box>
    </Stack>
  );
};

export default CellForm;
