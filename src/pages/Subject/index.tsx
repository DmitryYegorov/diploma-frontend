import React, { useEffect, useState } from "react";
import { Container, Grid, useMediaQuery } from "@mui/material";
import SubjectItem from "../../components/SubjectItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchSubjectsAction } from "../../store/reducers/Subject/ActionCreators";
import { useStyles } from "./styled";
import Form from "./Form";

const Subject: React.FC = () => {
  const { list, total, isLoading, error } = useAppSelector(
    (state) => state.subject
  );
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [selectedSubject, setSelectedSubject] = useState({});

  useEffect(() => {
    if (!isLoading && total === 0) {
      dispatch(fetchSubjectsAction());
    }
  }, [dispatch, isLoading, total]);

  const isDesktop = useMediaQuery("(min-width: 680px)");

  return (
    <Container>
      <Grid container>
        {!isDesktop ? (
          <Grid item xs={12}>
            <Form subject={selectedSubject} />
          </Grid>
        ) : null}
        <Grid item xs={isDesktop ? 8 : 12}>
          <Container className={classes.root}>
            {list.map((subject: any) => (
              <SubjectItem
                key={subject.id || "ehdwhdw"}
                author={
                  `${subject.user.firstName} ${subject.user.middleName} ${subject.user.lastName}` ||
                  "ehdwhdw"
                }
                createdAt={subject.createdAt || "ehdwhdw"}
                name={subject.name || "ehdwhdw"}
                onClick={() => setSelectedSubject(subject)}
              />
            ))}
          </Container>
        </Grid>
        {isDesktop ? (
          <Grid item xs={4}>
            <Form subject={selectedSubject} />
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
};

export default Subject;
