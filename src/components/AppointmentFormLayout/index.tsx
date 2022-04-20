import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SwapHoriz as SwapHorizIcon } from "@mui/icons-material";
import { useStyles } from "./styled";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import SelectForm from "../SelectForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchUsersAction } from "../../store/reducers/Users/ActionCreators";
import moment from "moment";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { SwapTeacher } from "../../typings/schedule";
import { swapTeacher } from "../../http/schedule";

const RecurrenceLayoutComponent: React.FC<
  AppointmentForm.RecurrenceLayoutProps
> = (props) => {
  return (
    <div style={{ display: "none" }}>
      <AppointmentForm.RecurrenceLayout {...props} visible={false} />
    </div>
  );
};

const CommandLayoutComponent: React.FC<AppointmentForm.CommandLayoutProps> = (
  props
) => (
  <AppointmentForm.CommandLayout
    {...props}
    fullSize={false}
    hideDeleteButton
    commandButtonComponent={() => <div style={{ display: "none" }} />}
  />
);

const BooleanEditorComponent: React.FC<AppointmentForm.BooleanEditorProps> = (
  props
) => (
  <div style={{ display: "none" }}>
    <AppointmentForm.BooleanEditor {...props} readOnly value={false} />
  </div>
);

const TextEditorComponent: React.FC<AppointmentForm.TextEditorProps> = (
  props
) => <Typography variant="h5">{props.value}</Typography>;

const DateEditorComponent: React.FC<AppointmentForm.DateEditorProps> = (
  props
) => {
  const classes = useStyles();

  return (
    <Box className={classes.dateLabel}>
      <Typography variant="h6">
        {moment(props.value).format("DD.MM.yyyy HH:mm")}
      </Typography>
    </Box>
  );
};

const AppointmentFormLayout: React.FC<AppointmentForm.BasicLayoutProps> = (
  props
) => {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.user);
  const { t } = useTranslation(["calendar"], { i18n });

  // eslint-disable-next-line no-console
  console.log(props.appointmentData);

  const { register, setValue, handleSubmit } = useForm({
    defaultValues: {
      reason: "",
      teacherId: "",
      classDate: new Date(props.appointmentData.startDate),
      scheduleClassId: props.appointmentData?.id || "",
    },
  });

  React.useEffect(() => {
    register("reason", { required: true });
    register("teacherId", { required: true });
    if (!userStore.total) {
      dispatch(fetchUsersAction());
    }
  }, [dispatch]);

  const swapTeacherRequest = async (data: SwapTeacher) => swapTeacher(data);

  const userOptions = userStore.list
    .filter(
      (user) => user.id && user.firstName && user.middleName && user.lastName
    )
    .map((user) => ({
      value: user.id,
      label: `${user.firstName} ${user.middleName![0]}. ${user.lastName![0]}.`,
    }));

  return (
    <AppointmentForm.BasicLayout {...props}>
      <Accordion>
        <AccordionSummary expandIcon={<SwapHorizIcon />}>
          <Typography variant="body1">{t("calendar:swapSetup")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <TextField
              label={t("calendar:notesLabel")}
              variant="outlined"
              fullWidth
              onChange={(e) => setValue("reason", e.target.value as string)}
              value={props.appointmentData.note}
            />
            <SelectForm
              label="Преподаватель"
              handleChange={(e) =>
                setValue("teacherId", e.target.value as string)
              }
              options={userOptions}
            />
            <Button
              variant="contained"
              onClick={handleSubmit(swapTeacherRequest)}
            >
              Send
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </AppointmentForm.BasicLayout>
  );
};

const CustomAppointmentForm: React.FC = () => {
  const { t } = useTranslation(["calendar"], { i18n });

  return (
    <AppointmentForm
      messages={{
        detailsLabel: t("calendar:moreInfo"),
        notesLabel: t("calendar:notesLabel"),
        moreInformationLabel: t("calendar:detailsLabel"),
        commitCommand: t("calendar:commitCommand"),
      }}
      basicLayoutComponent={AppointmentFormLayout}
      recurrenceLayoutComponent={RecurrenceLayoutComponent}
      commandLayoutComponent={CommandLayoutComponent}
      booleanEditorComponent={BooleanEditorComponent}
      dateEditorComponent={DateEditorComponent}
      textEditorComponent={TextEditorComponent}
    />
  );
};

export default CustomAppointmentForm;
