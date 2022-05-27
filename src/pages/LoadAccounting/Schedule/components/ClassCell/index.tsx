import React, { useState } from "react";
import { Divider, Stack, TableCell, Typography } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import ModalWindow from "../../../../../components/ModalWindow";
import { useStyles } from "./styled";
import ClassForm from "../ClassForm";
import { WeekDay, Week } from "../../../../../typings/enum";
import ConfirmationDialog from "../../../../../components/ConfirmationDialog";
import ContextMenu from "../../../../../components/ContextMenu";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import { deleteScheduleClass } from "../../../../../http/schedule";
import EditClassForm from "../EditClassForm";

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
  const { t } = useTranslation(["common"], { i18n });

  const [openModal, setOpenModal] = useState(false);

  const ClassCellItem = ({ classData, week }) => {
    const weeklyClass = classData?.[week]?.[0];
    const [editModal, setEditModal] = useState(false);
    const contextOptions = [
      {
        text: t("common:command.edit"),
        handleClick: (data) => {
          setEditModal(true);
        },
        icon: () => <EditIcon />,
      },
      {
        text: t("common:command.cancel"),
        handleClick: (data) => {
          deleteScheduleClass(data.id);
          window.location.reload();
        },
        icon: () => <DeleteIcon color="error" />,
      },
    ];

    return (
      <>
        <Typography variant="body1">
          {weeklyClass?.subject && (
            <ContextMenu options={contextOptions} itemData={weeklyClass}>
              {`${weeklyClass?.subject?.shortName} (${weeklyClass.room})`}
            </ContextMenu>
          )}
        </Typography>
        <Stack>
          {weeklyClass &&
            weeklyClass.groups.map((g: { id: string; label: string }) => (
              <Typography variant="body2">{g.label}</Typography>
            ))}
        </Stack>
        <ModalWindow
          open={editModal}
          setOpen={() => setEditModal(!editModal)}
          label={t("common:scheduleClassEditModalLabel")}
        >
          <EditClassForm editData={weeklyClass} />
        </ModalWindow>
      </>
    );
  };

  const ClassNonWeekly = ({ classData }) => {
    return (
      <Stack spacing={0.5}>
        <ClassCellItem classData={classData} week={Week.FIRST} />
        <Divider />
        <ClassCellItem classData={classData} week={Week.SECOND} />
      </Stack>
    );
  };

  return (
    <>
      <TableCell
        className={classes.root}
        onDoubleClick={() => setOpenModal(!openModal)}
        align="center"
        style={{ width: 150, border: "1px solid #ececec" }}
      >
        {!classValue?.[Week.WEEKLY] ? (
          <ClassNonWeekly classData={classValue} />
        ) : (
          <ClassCellItem classData={classValue} week={Week.WEEKLY} />
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
