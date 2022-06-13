import React from "react";
import { Column } from "../TableList/typings";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { Typography, Box, Paper, CircularProgress } from "@mui/material";

type Props = {
  teacherName?: string;
  data: Array<any>;
  loading: boolean;
};

const MonthLoadMappedTable: React.FC<Props> = ({
  data,
  loading,
  teacherName,
}) => {
  const { t } = useTranslation(["event"], { i18n });

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

  if (loading)
    return (
      <div
        style={{
          position: "relative",
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <Box
      style={{
        overflowX: "scroll",
        padding: 10,
        marginTop: 10,
      }}
      component={Paper}
    >
      <table style={{ borderCollapse: "collapse", margin: 10 }}>
        <thead>
          {teacherName ? (
            <th
              style={{
                padding: "10px",
                minWidth: 60,
                border: "1px solid #757575",
              }}
            >
              <Typography>Преподаватель</Typography>
            </th>
          ) : null}
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
          {teacherName ? (
            <tr>
              <td
                rowSpan={columns.length}
                style={{ border: "1px solid #757575", padding: "5px" }}
              >
                <Typography>{teacherName}</Typography>
              </td>
            </tr>
          ) : null}
          {!loading && data?.length
            ? data.map((lp) => (
                <tr>
                  {columns.map((c) => (
                    <td style={{ border: "1px solid #757575", padding: "5px" }}>
                      <Typography variant="body2">{lp[c.id]}</Typography>
                    </td>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </Box>
  );
};

export default MonthLoadMappedTable;
