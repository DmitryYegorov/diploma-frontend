import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import { ScheduleClassUpdateType } from "../../../typings/enum";
import moment from "moment";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import {
  Cancel as CanselIcon,
  MoveDown as MoveDownIcon,
  SwapHorizontalCircle as SwapIcon,
} from "@mui/icons-material";
import { blue } from "@mui/material/colors";

const icon = {
  [ScheduleClassUpdateType.SWAP]: () => (
    <SwapIcon style={{ color: blue[800] }} />
  ),
  [ScheduleClassUpdateType.CANCEL]: () => (
    <CanselIcon style={{ color: blue[800] }} />
  ),
  [ScheduleClassUpdateType.RESCHEDULED]: () => (
    <MoveDownIcon style={{ color: blue[800] }} />
  ),
};

type Props = {
  type: ScheduleClassUpdateType;
  scheduleClass: string;
  classDate: Date | string;
  teacher: string;
  newTeacher?: string;
  reason: string;
  rescheduleDate: Date | string;
};

const Item: React.FC<Props> = (props) => {
  const { t } = useTranslation(["common", "event"], { i18n });

  return (
    <Accordion>
      <AccordionSummary>
        <Stack direction="row" spacing={1}>
          {icon[props.type]()}

          <Typography variant="body1">
            {props.scheduleClass} -{" "}
            {moment(props.classDate).format("DD.MM.yyyy")}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={0.5}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            {t("common:reason")}:
          </Typography>
          <Typography variant="body1">{props.reason}</Typography>
        </Stack>

        <Stack direction="column" spacing={0.5}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            {t("common:teacher")}:
          </Typography>
          <Typography variant="body1">{props.teacher}</Typography>
        </Stack>
        {props.type === ScheduleClassUpdateType.SWAP && (
          <>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {t("event:SWAP")}:
            </Typography>
            <Typography variant="body1">{props.newTeacher}</Typography>
          </>
        )}
        {props.type === ScheduleClassUpdateType.RESCHEDULED && (
          <Stack direction="column" spacing={0.5}>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {t("event:rescheduledTo")}:
            </Typography>
            <Typography variant="body1">
              {moment(props.rescheduleDate).format("DD.MM.yyyy")}
            </Typography>
          </Stack>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default Item;
