import React, { useState } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Chip,
  Collapse,
  IconButton,
  Paper,
  Stack,
  TableCell,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  SettingsBackupRestore as SettingsBackupRestoreIcon,
} from "@mui/icons-material";
import TableList from "../../../../components/TableList";
import { ClassType } from "../../../../typings/enum";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import { useStyles } from "./styled";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux";
import moment from "moment";
import DropDownMenu from "../../../../components/DropDownMenu";
import {
  reloadDataToReport,
  removeLoadItemFromReport,
} from "../../../../http/report";
import CustomPopper from "../../../../components/CustomPopper";
import { Column } from "../../../../components/TableList/typings";

type Props = {
  loadData: Array<any>;
  reportId: string;
  fetchLoadData?: () => Promise<void | any>;
};

const ListClasses: React.FC<Props> = ({
  loadData,
  fetchLoadData,
  reportId,
}) => {
  const { t } = useTranslation(["report"], { i18n });

  const { isLoading } = useAppSelector((state) => state.report);

  const loadClassesColumns: Column[] = [
    {
      id: "subjectName",
      label: t("report:nameLabel"),
      sortable: true,
    },
    {
      id: "date",
      label: t("report:classDate"),
      renderCell: (row) => (
        <TableCell>
          {!row.isOtherLoad
            ? moment(row.date).format("DD-MM-yyyy")
            : moment(row.date).format("MMMM-yyyy").toUpperCase()}
        </TableCell>
      ),
      sortable: true,
    },
    {
      id: "type",
      label: t("report:classType"),
      renderCell: (row) => {
        const key = `event:${row.type as ClassType}`;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return <TableCell>{t(key, "-")}</TableCell>;
      },
      sortable: false,
    },
    { id: "duration", label: "Кол-во часов", align: "center" },
    {
      id: "groups",
      label: "Подгруппы",
      sortable: false,
      renderCell: (row) => {
        if (row.groups?.length) {
          return (
            <TableCell>
              <CustomPopper>
                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                  {row?.groups?.map((group, index) => (
                    <div style={{ margin: 2 }} key={index}>
                      <Tooltip title={group.speciality}>
                        <Chip label={group.label} />
                      </Tooltip>
                    </div>
                  ))}
                </Stack>
              </CustomPopper>
            </TableCell>
          );
        }
        return <TableCell>{null}</TableCell>;
      },
    },
  ];

  const renderActions = (row) => {
    return (
      <DropDownMenu
        options={[
          {
            key: `delete-${row.id}`,
            icon: () => <DeleteIcon color={"error"} />,
            handleClick: async () => {
              await removeLoadItemFromReport(row.id);
              await fetchLoadData();
            },
            text: t("report:actions.deleteItemAction"),
          },
        ]}
      />
    );
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{t("report:classes")}</Typography>
      </AccordionSummary>
      <AccordionActions>
        <Stack direction="row">
          <Button
            variant="text"
            startIcon={<SettingsBackupRestoreIcon />}
            onClick={() => {
              reloadDataToReport(reportId);
              fetchLoadData();
            }}
          >
            Обновить данные
          </Button>
        </Stack>
      </AccordionActions>
      <AccordionDetails>
        <TableList
          columns={loadClassesColumns}
          rows={loadData}
          count={loadData.length}
          isLoading={isLoading}
          renderActions={renderActions}
        />
      </AccordionDetails>
    </Accordion>
  );
};

ListClasses.defaultProps = {
  fetchLoadData: () => undefined,
};

export default ListClasses;
