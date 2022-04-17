import React, { useEffect } from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import Calendar from "../../../components/Calendar";
import { useStyles } from "./styled";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchAllEventsAction } from "../../../store/reducers/Event/ActionCreators";

const CalendarPage: React.FC = () => {
  const classes = useStyles();

  const { list, isLoading } = useAppSelector((state) => state.event);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchAllEventsAction());
    }
  }, [dispatch]);

  return (
    <Container>
      <Calendar appointments={list} />
    </Container>
  );
};

export default CalendarPage;
