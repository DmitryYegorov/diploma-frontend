import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
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

  return (
    <Container>
      <Grid container>
        <Grid item xs={8}>
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
        <Grid item xs={4}>
          <Form subject={selectedSubject} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Subject;
