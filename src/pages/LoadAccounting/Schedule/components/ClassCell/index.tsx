import React, { useState } from "react";
import { Divider, Stack, TableCell, Typography } from "@mui/material";
import ModalWindow from "../../../../../components/ModalWindow";
import { useStyles } from "./styled";
import { useForm } from "react-hook-form";
import ClassForm from "../ClassForm";
import { WeekDay, Week } from "../../../../../typings/enum";

type Props = {
  weekDay: WeekDay;
  scheduleTimeId: string;
  classValue?: any;
};

const ClassCell: React.FC<Props> = ({
  weekDay,
  scheduleTimeId,
  classValue,
}) => {
  const classes = useStyles();

  const { control } = useForm();
  const [openModal, setOpenModal] = useState(false);

  const ClassWeekly = () => {
    const weeklyClass = classValue?.[Week.WEEKLY]?.[0];

    return (
      <Typography variant="body1">
        {weeklyClass?.subject.shortName || "-"}
        <Stack>
          {weeklyClass &&
            weeklyClass.groups.map((g: string) => (
              <Typography variant="body2">{g}</Typography>
            ))}
        </Stack>
      </Typography>
    );
  };

  const ClassNonWeekly = () => {
    const firstWeek = classValue?.[Week.FIRST]?.[0];
    const secondWeek = classValue?.[Week.SECOND]?.[0];

    return (
      <Stack spacing={2}>
        <Typography variant="body1">
          {(firstWeek?.subject &&
            `${firstWeek?.subject?.shortName} (${firstWeek.room})`) ||
            "-"}

          <Stack>
            {firstWeek?.groups?.length &&
              firstWeek.groups.map((g: string) => (
                <Typography variant="body2">{g}</Typography>
              ))}
          </Stack>
        </Typography>
        <Typography variant="body1">
          {(secondWeek?.subject &&
            `${secondWeek?.subject?.shortName} (${secondWeek.room})`) ||
            "-"}

          <Stack>
            {secondWeek?.groups?.length &&
              secondWeek.groups.map((g: string) => (
                <Typography variant="body2">{g}</Typography>
              ))}
          </Stack>
        </Typography>
      </Stack>
    );
  };

  return (
    <>
      <TableCell
        className={classes.root}
        onClick={() => setOpenModal(!openModal)}
        align="center"
        style={{ width: 150 }}
      >
        {!classValue?.[Week.WEEKLY] ? <ClassNonWeekly /> : <ClassWeekly />}
      </TableCell>

      <ModalWindow
        open={openModal}
        setOpen={() => setOpenModal(!open)}
        label={"Установка занятия"}
      >
        <ClassForm weekDay={weekDay} scheduleTime={scheduleTimeId} />
      </ModalWindow>
    </>
  );
};

export default ClassCell;
