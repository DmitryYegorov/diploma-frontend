import React, { useState } from "react";
import ReactDataSheet from "react-datasheet";
import styled from "styled-components";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "react-datasheet/lib/react-datasheet.css";

import i18n from "../../i18n";
import { ClassType } from "../../typings/enum";
type Props = {
  load: Array<any>;
};

const LoadReportTable: React.FC<Props> = ({ load }) => {
  const { t } = useTranslation(["common", "report"], { i18n });

  return (
    <>
      <Typography variant="h6">{t("report:loadReportLabel")}</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("report:subjectName")}</TableCell>
              <TableCell>{t("report:lecture")}</TableCell>
              <TableCell>{t("report:lab")}</TableCell>
              <TableCell>{t("report:practice")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!load.length &&
              load.map((item) => (
                <TableRow>
                  <TableCell>{item.subjectName}</TableCell>
                  <TableCell>{item[ClassType.LECTION] || "-"}</TableCell>
                  <TableCell>{item[ClassType.LAB] || "-"}</TableCell>
                  <TableCell>{item[ClassType.PRACTICE_CLASS] || "-"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default LoadReportTable;
