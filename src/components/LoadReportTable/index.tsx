import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TableContainer,
  Typography,
} from "@mui/material";
import {
  Save as SaveIcon,
  SettingsBackupRestore as SettingsBackupRestoreIcon,
} from "@mui/icons-material";
import ReportCell from "./ReportCell";
import { useTranslation } from "react-i18next";
import { LoadTypeEnum, LoadItemType } from "../../typings/load";
import {
  useStyles,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "./styled";

import i18n from "../../i18n";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { reportSlice } from "../../store/reducers/Report/slice";
import { saveChangesCalculatedReport } from "../../http/report";

const LoadReportTable: React.FC = () => {
  const { t } = useTranslation(["report", "event"], { i18n });

  const { selectedReport, calculatedChanged, calculatedForChange } =
    useAppSelector((state) => state.report);

  const dispatch = useAppDispatch();

  const classes = useStyles();

  return (
    <Accordion expanded={!!calculatedForChange.length}>
      <AccordionSummary>
        <Typography>{t("report:calculatedReportLabel")}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button
          startIcon={<SaveIcon />}
          disabled={!calculatedChanged}
          onClick={() =>
            saveChangesCalculatedReport(selectedReport.id, calculatedForChange)
          }
        >
          {t("report:actions.saveChangesAction")}
        </Button>
        <Button
          startIcon={<SettingsBackupRestoreIcon />}
          disabled={!calculatedChanged}
          onClick={() => dispatch(reportSlice.actions.restoreChanges())}
        >
          {t("report:actions.restoreChangesAction")}
        </Button>
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>
                  {t("report:faculty")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("report:subgroupsCount")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("report:studentsCount")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("report:subjectName")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("event:LECTION")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("event:LAB")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("event:PRACTICE_CLASS")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("event:CONSULTATION")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("event:COURSE_WORK")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("event:EXAM")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("event:CREDIT")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("event:POSTGRADUATE")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("event:TESTING")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("event:PRACTICE")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("event:DIPLOMA_DESIGN")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {t("event:STATE_EXAMINATION_BOARD")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!calculatedForChange.length &&
                calculatedForChange.map((item) => (
                  <TableRow>
                    <ReportCell
                      value={item.facultyName}
                      column={"facultyName"}
                      subjectName={item.subjectName}
                      type={"text"}
                    />
                    <ReportCell
                      value={item.groupsCount}
                      column={"groupsCount"}
                      subjectName={item.subjectName}
                    />
                    <ReportCell
                      value={item.studentsCount}
                      column={"studentsCount"}
                      subjectName={item.subjectName}
                    />
                    <TableCell className={classes.tableCell}>
                      {item.subjectName}
                    </TableCell>
                    <ReportCell
                      value={item[LoadTypeEnum.LECTION]}
                      column={LoadTypeEnum.LECTION}
                      subjectName={item.subjectName}
                    />
                    <ReportCell
                      value={item[LoadTypeEnum.LAB]}
                      column={LoadTypeEnum.LAB}
                      subjectName={item.subjectName}
                    />
                    <ReportCell
                      value={item[LoadTypeEnum.PRACTICE_CLASS]}
                      column={LoadTypeEnum.PRACTICE_CLASS}
                      subjectName={item.subjectName}
                    />
                    <ReportCell
                      value={item[LoadTypeEnum.CONSULTATION]}
                      column={LoadTypeEnum.CONSULTATION}
                      subjectName={item.subjectName}
                    />
                    <ReportCell
                      value={item[LoadTypeEnum.COURSE_WORK]}
                      column={LoadTypeEnum.COURSE_WORK}
                      subjectName={item.subjectName}
                    />
                    <ReportCell
                      value={item[LoadTypeEnum.EXAM]}
                      column={LoadTypeEnum.EXAM}
                      subjectName={item.subjectName}
                    />
                    <ReportCell
                      value={item[LoadTypeEnum.CREDIT]}
                      column={LoadTypeEnum.CREDIT}
                      subjectName={item.subjectName}
                    />
                    <ReportCell
                      value={item[LoadTypeEnum.POSTGRADUATE]}
                      column={LoadTypeEnum.POSTGRADUATE}
                      subjectName={item.subjectName}
                    />
                    <ReportCell
                      value={item[LoadTypeEnum.TESTING]}
                      column={LoadTypeEnum.TESTING}
                      subjectName={item.subjectName}
                    />
                    <ReportCell
                      value={item[LoadTypeEnum.PRACTICE]}
                      column={LoadTypeEnum.PRACTICE}
                      subjectName={item.subjectName}
                    />
                    <ReportCell
                      value={item[LoadTypeEnum.DIPLOMA_DESIGN]}
                      column={LoadTypeEnum.DIPLOMA_DESIGN}
                      subjectName={item.subjectName}
                    />
                    <ReportCell
                      value={item[LoadTypeEnum.STATE_EXAMINATION_BOARD]}
                      column={LoadTypeEnum.DIPLOMA_DESIGN}
                      subjectName={item.subjectName}
                    />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default LoadReportTable;
