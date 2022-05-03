import React from "react";
import { Stack, IconButton, Tooltip } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import { useStyles } from "./styled";
import { useTranslation } from "react-i18next";

import i18n from "../../../../i18n";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

const DataGridToolbarClasses: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation(["report"], { i18n });

  const dispatch = useAppDispatch();
  const { loadedClasses } = useAppSelector((state) => state.report);

  return (
    <Stack direction="row" spacing={1.5}>
      <Tooltip title={t("report:saveSelectedTooltip")}>
        <IconButton className={classes.iconButton}>
          <SaveIcon className={classes.icon} color="primary" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default DataGridToolbarClasses;
