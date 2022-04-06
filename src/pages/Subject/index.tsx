import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import SubjectItem from "../../components/SubjectItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchSubjectsAction } from "../../store/reducers/Subject/ActionCreators";
import { useStyles } from "./styled";

const Subject: React.FC = () => {
  const { list, total, isLoading, error } = useAppSelector(
    (state) => state.subject
  );
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (!isLoading && total === 0) {
      dispatch(fetchSubjectsAction());
    }
  }, [dispatch, isLoading, total]);

  return (
    <Container className={classes.root}>
      {list.map((subject: any) => (
        <SubjectItem
          key={subject.id || "ehdwhdw"}
          author={subject.createdBy || "ehdwhdw"}
          createdAt={subject.createdAt || "ehdwhdw"}
          name={subject.name || "ehdwhdw"}
        />
      ))}
    </Container>
  );
};

export default Subject;
