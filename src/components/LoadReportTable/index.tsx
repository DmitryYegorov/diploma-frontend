import React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from "@mui/material";

const LoadReportTable: React.FC = () => {
  return (
    <table border={1}>
      <thead>
        <tr rowSpan={2}>
          <td rowSpan={2}>Ф.И.О</td>
          <td rowSpan={2}>Ученое звание и степень</td>
          <td rowSpan={2}>Штатный, совместитель</td>
          <td rowSpan={2}>Дисциплина</td>
          <td rowSpan={2}>Ф-т</td>
          <td rowSpan={2}>Курс</td>
          <td rowSpan={2}>к-во подгрупп</td>
          <td rowSpan={2}>к-во чел-к</td>
        </tr>
        <tr>
          <td colSpan={3}>Осенний семестр</td>
        </tr>
        <tr>
          <td>Лекции</td>
          <td>Пр.зан.</td>
          <td>Лаб.зан.</td>
        </tr>
      </thead>
    </table>
  );
};

export default LoadReportTable;
