import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ReportCell from "./ReportCell";
import { useTranslation } from "react-i18next";
import { LoadTypeEnum, LoadItemType } from "../../typings/load";
import { useStyles } from "./styled";

import i18n from "../../i18n";

type Props = {
  load: Array<LoadItemType>;
};

const LoadReportTable: React.FC<Props> = ({ load }) => {
  const { t } = useTranslation(["report", "event"], { i18n });

  const classes = useStyles();

  return (
    <Accordion expanded={!!load.length}>
      <AccordionSummary>
        <Typography>{t("report:calculatedReportLabel")}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell>{t("report:subjectName")}</TableCell>
                <TableCell>{t("event:LECTION")}</TableCell>
                <TableCell>{t("event:LAB")}</TableCell>
                <TableCell>{t("event:PRACTICE_CLASS")}</TableCell>
                <TableCell>{t("event:CONSULTATION")}</TableCell>
                <TableCell>{t("event:COURSE_WORK")}</TableCell>
                <TableCell>{t("event:EXAM")}</TableCell>
                <TableCell>{t("event:CREDIT")}</TableCell>
                <TableCell>{t("event:POSTGRADUATE")}</TableCell>
                <TableCell>{t("event:TESTING")}</TableCell>
                <TableCell>{t("event:PRACTICE")}</TableCell>
                <TableCell>{t("event:DIPLOMA_DESIGN")}</TableCell>
                <TableCell>{t("event:STATE_EXAMINATION_BOARD")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!load.length &&
                load.map((item) => (
                  <TableRow>
                    <TableCell>{item.subjectName}</TableCell>
                    <ReportCell value={item[LoadTypeEnum.LECTION] || "-"} />
                    <TableCell>{item[LoadTypeEnum.LAB] || "-"}</TableCell>
                    <TableCell>
                      {item[LoadTypeEnum.PRACTICE_CLASS] || "-"}
                    </TableCell>
                    <TableCell>
                      {item[LoadTypeEnum.CONSULTATION] || "-"}
                    </TableCell>
                    <TableCell>
                      {item[LoadTypeEnum.COURSE_WORK] || "-"}
                    </TableCell>
                    <TableCell>{item[LoadTypeEnum.EXAM] || "-"}</TableCell>
                    <TableCell>{item[LoadTypeEnum.CREDIT] || "-"}</TableCell>
                    <TableCell>
                      {item[LoadTypeEnum.POSTGRADUATE] || "-"}
                    </TableCell>
                    <TableCell>{item[LoadTypeEnum.TESTING] || "-"}</TableCell>
                    <TableCell>{item[LoadTypeEnum.PRACTICE] || "-"}</TableCell>
                    <TableCell>
                      {item[LoadTypeEnum.DIPLOMA_DESIGN] || "-"}
                    </TableCell>
                    <TableCell>
                      {item[LoadTypeEnum.STATE_EXAMINATION_BOARD] || "-"}
                    </TableCell>
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
