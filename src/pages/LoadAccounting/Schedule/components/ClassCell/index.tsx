import React, { useState } from "react";
import { Divider, TableCell, Typography } from "@mui/material";
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

  return (
    <>
      <TableCell
        className={classes.root}
        onClick={() => setOpenModal(!openModal)}
        align="center"
        style={{ width: 150 }}
      >
        {!classValue?.[Week.WEEKLY] ? (
          <>
            <Typography variant="body2">
              {classValue?.[Week.FIRST]?.[0]?.subject.shortName || "-"}
            </Typography>
            <Divider />
            <Typography>
              {classValue?.[Week.SECOND]?.[0]?.subject.shortName || "-"}
            </Typography>
          </>
        ) : (
          <Typography variant="body2">
            {classValue?.[Week.WEEKLY]?.[0]?.subject.shortName || "-"}
          </Typography>
        )}
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
