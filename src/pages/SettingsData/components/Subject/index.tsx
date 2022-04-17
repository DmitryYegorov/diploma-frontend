import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { fetchSubjectsAction } from "../../../../store/reducers/Subject/ActionCreators";
import { useStyles } from "./styled";
import Form from "./Form";
import { useTranslation } from "react-i18next";

import i18n from "../../../../i18n";

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
  const { list, total, isLoading, error } = useAppSelector(
    (state) => state.subject
  );
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [selectedSubject, setSelectedSubject] = useState({});

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { t } = useTranslation(["common"], { i18n });

  useEffect(() => {
    if (!isLoading && total === 0) {
      dispatch(fetchSubjectsAction());
    }
  }, [dispatch, isLoading, total]);

  // return (
  //   <Container>
  //     <Grid container>
  //       <Grid item xs={8}>
  //         <Container className={classes.root}>
  //           {list.map((subject: any) => (
  //             <SubjectItem
  //               key={subject.id || "ehdwhdw"}
  //               author={
  //                 `${subject.user.firstName} ${subject.user.middleName} ${subject.user.lastName}` ||
  //                 "ehdwhdw"
  //               }
  //               createdAt={subject.createdAt || "ehdwhdw"}
  //               name={subject.name || "ehdwhdw"}
  //               onClick={() => setSelectedSubject(subject)}
  //             />
  //           ))}
  //         </Container>
  //       </Grid>
  //       <Grid item xs={4}>
  //         <Form subject={selectedSubject} />
  //       </Grid>
  //     </Grid>
  //   </Container>
  // );

  return (
    <Container>
      <Tabs value={value} onChange={handleChange}>
        <Tab label={t("common:subjectControl")} />
        <Tab label={t("common:subjectControl")} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Subjects
      </TabPanel>
    </Container>
  );
};

export default SettingsData;
