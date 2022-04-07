import React, { useState } from "react";
import { Divider, TableCell, Typography } from "@mui/material";
import ModalWindow from "../../../../../components/ModalWindow";
import { useStyles } from "./styled";
import { useForm } from "react-hook-form";
import ClassForm from "../ClassForm";
import { WeekDay } from "../../../../../typings/enum";

type Props = {
  weekDay: WeekDay;
};

const ClassCell: React.FC<Props> = ({ weekDay }) => {
  const classes = useStyles();

  const { control } = useForm();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <TableCell
        className={classes.root}
        onClick={() => setOpenModal(!openModal)}
      >
        <Typography variant="body2">Теория Цвета (ФИТ-10)</Typography>
        <Divider />
        <Typography> - </Typography>
      </TableCell>

      <ModalWindow
        open={openModal}
        setOpen={() => setOpenModal(!open)}
        label={"Установка занятия"}
      >
        <ClassForm />
      </ModalWindow>
    </>
  );
};

export default ClassCell;
