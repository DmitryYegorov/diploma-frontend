import React from "react";
import {
  CircularProgress,
  Container,
  Stack,
  Typography,
  Box,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { fetchActiveTeachers } from "../../../http/load-plan";
import { getAcademicYear } from "../../../http/semester";
import moment from "moment";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import TeacherLoadItem from "./components/TeacherLoadItem";

const PlanLoad: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation(["common", "plan"], { i18n });

  const [teachers, fetchTeachers] = useAsyncFn(async () => {
    const res = await fetchActiveTeachers();

    return res.data;
  });

  const [academicYear, fetchAcademicYear] = useAsyncFn(async (academicId) => {
    const res = await getAcademicYear(academicId);

    return res.data;
  });

  const isDesktop = useMediaQuery("(min-width: 680px)");

  React.useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);
  React.useEffect(() => {
    if (id) {
      fetchAcademicYear(id);
    }
  }, [fetchAcademicYear]);

  if (academicYear.loading)
    return (
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (academicYear.value)
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" noWrap>{`${t(
              "common:academicYear"
            )} (${moment(academicYear.value.academicYear.startDate).format(
              "DD-MM-yyyy"
            )} - ${moment(academicYear.value.academicYear.endDate).format(
              "DD-MM-yyyy"
            )})`}</Typography>
          </Grid>
          <Grid item xs={12}>
            {teachers.loading ? (
              <CircularProgress />
            ) : (
              <Stack>
                {!!teachers.value?.length &&
                  teachers.value.map((teacher, index) => (
                    <TeacherLoadItem
                      firstName={teacher.firstName}
                      lastName={teacher.lastName}
                      middleName={teacher.middleName}
                      teacherId={teacher.id}
                      semesters={academicYear.value.semesters}
                      expand={index === 0}
                    />
                  ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>
    );
};

export default PlanLoad;
