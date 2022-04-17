import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchSubjectsAction } from "../../store/reducers/Subject/ActionCreators";
import { useStyles } from "./styled";
import { useTranslation } from "react-i18next";
import Subject from "./components/Subject";

import i18n from "../../i18n";
import ScheduleTime from "./components/ScheduleTime";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SettingsData: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { t } = useTranslation(["common"], { i18n });

  return (
    <Container>
      <Tabs value={value} onChange={handleChange}>
        <Tab label={t("common:subjectControl")} {...a11yProps(0)} />
        <Tab label={"Расписание звонков"} {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Subject />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ScheduleTime />
      </TabPanel>
    </Container>
  );
};

export default SettingsData;
