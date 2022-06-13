import React, { useRef } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  buttonBaseClasses,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { fetchTotalReportById } from "../../../http/report";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Column } from "../../../components/TableList/typings";

const Dashboard: React.FC = () => {
  const { id } = useParams();

  const [state, fetchReport] = useAsyncFn(async (reportId) => {
    const res = await fetchTotalReportById(reportId);

    return res.data;
  });

  React.useEffect(() => {
    if (id) {
      fetchReport(id);
    }
  }, [id]);

  const columns: Column[] = [
    { id: "subjectName", label: "Дисциплина", sortable: false },
    { id: "facultyName", label: "Ф-т", sortable: false },
    { id: "subGroupsCount", label: "Кол-во подгрупп", sortable: false },
    { id: "specialityName", label: "Курс", sortable: false },

    { id: "LECTION", label: "Лекции", sortable: false },
    { id: "PRACTICE_CLASS", label: "Пр. занятия", sortable: false },
    { id: "LAB", label: "Лаб. занятия", sortable: false },
    { id: "CREDIT", label: "Зачёты", sortable: false },
    { id: "EXAM", label: "Экзамены", sortable: false },
    { id: "CONSULTATION", label: "Консультации", sortable: false },
    { id: "COURSE_WORK", label: "Курсовые работы", sortable: false },
    { id: "TESTING", label: "Тестирование", sortable: false },
    {
      id: "DIPLOMA_DESIGN",
      label: "Дипломное проектирование",
      sortable: false,
    },
    { id: "POSTGRADUATE", label: "Магистранты/аспиранты", sortable: false },
    { id: "PRACTICE", label: "Практика", sortable: false },
    {
      id: "STATE_EXAMINATION_BOARD",
      label: "ГЭК по спец",
      sortable: false,
    },
    { id: "total", label: "ВСЕГО", sortable: false },
  ];

  if (state.loading)
    return (
      <div style={{ position: "relative", top: "50%", left: "50%" }}>
        <CircularProgress />
      </div>
    );

  if (state.value)
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant={"h2"}>{state.value.reportName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            style={{
              overflowX: "scroll",
              padding: 10,
              marginTop: 10,
            }}
          >
            <ReactHTMLTableToExcel
              className={"MuiButton-contained"}
              table="emp"
              filename="ReportExcel"
              sheet="Sheet"
              buttonText="Сохранить в Excel"
            />
            <table style={{ borderCollapse: "collapse" }} id={"emp"}>
              <thead>
                <th
                  style={{
                    padding: "10px",
                    minWidth: 60,
                    border: "1px solid #757575",
                  }}
                >
                  <Typography>Преподаватель</Typography>
                </th>
                {columns.map((c) => (
                  <th
                    style={{
                      padding: "10px",
                      minWidth: 60,
                      border: "1px solid #757575",
                    }}
                  >
                    <Typography>{c.label}</Typography>
                  </th>
                ))}
              </thead>
              <tbody>
                {state.value.data.map((teacher) => (
                  <>
                    <tr>
                      <td
                        rowSpan={teacher.load.length + 1}
                        style={{
                          border: "1px solid #757575",
                          padding: "5px",
                        }}
                      >
                        <Typography>{teacher.teacherName}</Typography>
                      </td>
                    </tr>
                    {teacher.load.map((lp) => (
                      <tr>
                        {columns.map((c) => (
                          <td
                            style={{
                              border: "1px solid #757575",
                              padding: "5px",
                            }}
                          >
                            <Typography variant="body2">{lp[c.id]}</Typography>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </Box>
        </Grid>
      </Grid>
    );
};

export default Dashboard;
