import * as React from "react";
import {
  School as SchoolIcon,
  TableView as TableViewIcon,
} from "@mui/icons-material";
import { Paper, Button, Stack, Typography, ButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useStyles } from "./styled";
import i18n from "../../../../i18n";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  calculateReportDataAction,
  clearLoadedClassesAction,
  loadClassesForReportAction,
} from "../../../../store/reducers/Report/ActionCreators";

const ReportMenu: React.FC = () => {
  const { t } = useTranslation(["report"], { i18n });
  const classes = useStyles();

  const { selectedReport } = useAppSelector((state) => state.report);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <ButtonGroup className={classes.buttonGroup}>
      <Button
        variant="text"
        onClick={() => {
          dispatch(clearLoadedClassesAction());
          dispatch(loadClassesForReportAction(selectedReport.id));
        }}
        endIcon={<SchoolIcon />}
      >
        {t("report:menu.loadData")}
      </Button>
      <Button
        variant="text"
        onClick={() => {
          dispatch(calculateReportDataAction(selectedReport.id));
        }}
        endIcon={<TableViewIcon />}
      >
        {t("report:menu.calculate")}
      </Button>
    </ButtonGroup>
  );
};

export default ReportMenu;
