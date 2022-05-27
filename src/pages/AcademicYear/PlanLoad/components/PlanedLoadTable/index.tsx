import React from "react";
import TableList from "../../../../../components/TableList";
import { Column } from "../../../../../components/TableList/typings";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import { useAsyncFn } from "react-use";
import {
  deleteLoadPlanItemById,
  getLoadPlanByOptions,
} from "../../../../../http/load-plan";
import { Typography, Box } from "@mui/material";

type Props = {
  teacherId: string;
  semesterId: string;
};

const PlanedLoadTable: React.FC<Props> = ({ teacherId, semesterId }) => {
  const { t } = useTranslation(["event"], { i18n });

  const [state, fetchLoadPlaned] = useAsyncFn(async (options) => {
    const res = await getLoadPlanByOptions(options);

    return res.data;
  });

  React.useEffect(() => {
    fetchLoadPlaned({ teacherId, semesterId });
  }, [fetchLoadPlaned]);

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

  return (
    <Box
      style={{
        overflowX: "scroll",
      }}
    >
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          {columns.map((c) => (
            <th
              style={{
                padding: "10px",
                minWidth: 60,
                border: "1px solid #ececec",
              }}
            >
              <Typography>{c.label}</Typography>
            </th>
          ))}
        </thead>
        <tbody>
          {!state.loading && state.value
            ? state.value.map((lp) => (
                <tr>
                  {columns.map((c) => (
                    <td style={{ border: "1px solid #ececec", padding: "5px" }}>
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

export default PlanedLoadTable;
