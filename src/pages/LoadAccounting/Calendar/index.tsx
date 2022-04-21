import React from "react";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import Calendar from "../../../components/Calendar";
import { Circle } from "@mui/icons-material";
import { useStyles } from "./styled";
import { useTranslation } from "react-i18next";

import i18n from "../../../i18n";
import { AppointmentMarkColors } from "../../../components/Appointment/styled";
import { ClassType } from "../../../typings/enum";

const CalendarPage: React.FC = () => {
  const classes = useStyles();

  const { t } = useTranslation(["event"], { i18n });

  return (
    <Container>
      <Stack spacing={2}>
        <Paper className={classes.padding}>
          <Stack direction="row" spacing={2}>
            <Box style={{ display: "flex" }}>
              <Circle style={{ color: AppointmentMarkColors[ClassType.LAB] }} />
              <Typography> {t("event:LAB")}</Typography>
            </Box>
            <Box style={{ display: "flex", justifyContent: "space-around" }}>
              <Circle
                style={{ color: AppointmentMarkColors[ClassType.LECTION] }}
              />
              <Typography> {t("event:LECTION")}</Typography>
            </Box>
            <Box style={{ display: "flex" }}>
              <Circle
                style={{
                  color: AppointmentMarkColors[ClassType.PRACTICE_CLASS],
                }}
              />
              <Typography> {t("event:PRACTICE_CLASS")}</Typography>
            </Box>
            <Box style={{ display: "flex" }}>
              <Circle style={{ color: AppointmentMarkColors.SWAP }} />
              <Typography> {t("event:SWAP")}</Typography>
            </Box>
          </Stack>
        </Paper>
        <Calendar />
      </Stack>
    </Container>
  );
};

export default CalendarPage;
