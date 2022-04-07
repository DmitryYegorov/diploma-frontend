import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { fetchCurrentSemesterAction } from "../../../../store/reducers/Semester/ActionCreators";
import { Box, Container, Typography } from "@mui/material";

const CreateSchedule: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector((state) => state.semester);

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchCurrentSemesterAction());
    }
  }, [dispatch]);

  return (
    <Container>
      <Box>
        <Typography variant={"h2"}>Создать расписание</Typography>
      </Box>
    </Container>
  );
};

export default CreateSchedule;
