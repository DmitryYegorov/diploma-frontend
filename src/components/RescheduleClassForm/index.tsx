import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SwapHoriz as SwapHorizIcon } from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SchedulerDateTime } from "@devexpress/dx-react-scheduler";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import SelectForm from "../SelectForm";
import { ScheduleClassUpdateType } from "../../typings/enum";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n";
import { useForm } from "react-hook-form";
import { UpdateScheduleClass } from "../../typings/schedule";
import { updateScheduleClass } from "../../http/schedule";
import { fetchAllClassesAction } from "../../store/reducers/Event/ActionCreators";
import { useAppDispatch } from "../../hooks/redux";

type Props = {
  scheduleClassId: string | number;
  classDate: SchedulerDateTime;
};

const RescheduleClassForm: React.FC<Props> = (props) => {
  const { t } = useTranslation(["calendar", "common"], { i18n });

  const dispatch = useAppDispatch();

  const [formType, setFormType] = useState<ScheduleClassUpdateType>();
  const [selectedDate, setSelectedDate] = useState<any>(props.classDate);

  const { register, setValue, handleSubmit, getValues } =
    useForm<UpdateScheduleClass>();

  React.useEffect(() => {
    register("scheduleClassId", { value: props.scheduleClassId });
    register("classDate", { value: props.classDate });
    register("type", { required: true });
    register("reason", { required: true });
    register("rescheduleDate");
  }, [register]);

  const sendRequest = async (data: UpdateScheduleClass) => {
    await updateScheduleClass(data);
    dispatch(fetchAllClassesAction());
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<SwapHorizIcon />}>
        <Typography variant="body1">
          {t("calendar:rescheduleClassAccordionLabel")}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <SelectForm
            label={t("common:type")}
            handleChange={(e) => {
              setFormType(e.target.value);
              setValue("type", e.target.value as ScheduleClassUpdateType);
            }}
            options={[
              {
                value: ScheduleClassUpdateType.CANCEL,
                label: t("calendar:cancelClass"),
              },
              {
                value: ScheduleClassUpdateType.RESCHEDULED,
                label: t("calendar:rescheduleClass"),
              },
            ]}
          />
          <TextField
            label={t("calendar:notesLabel")}
            variant="outlined"
            fullWidth
            onChange={(e) => setValue("reason", e.target.value as string)}
          />
          {formType === ScheduleClassUpdateType.RESCHEDULED && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label={t("calendar:selectDateLabel")}
                inputFormat="dd/MM/yyyy"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  setValue("rescheduleDate", newValue as Date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          )}
          <Button variant="contained" onClick={handleSubmit(sendRequest)}>
            {t("common:send")}
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default RescheduleClassForm;
