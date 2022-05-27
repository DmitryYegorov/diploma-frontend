import React, { useState } from "react";
import { TableCell, Input } from "../styled";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { reportSlice } from "../../../store/reducers/Report/slice";
import { ClassType, EventType } from "../../../typings/enum";

type Props = {
  subjectName: string;
  column:
    | ClassType
    | EventType
    | "groupsCount"
    | "facultyName"
    | "studentsCount";
  value: number | string;
  type?: "text" | "number";
};

const ReportCell: React.FC<Props> = ({ value, type, subjectName, column }) => {
  const { calculatedForChange } = useAppSelector((state) => state.report);
  const dispatch = useAppDispatch();

  const handleChange = (e) => {
    const items = calculatedForChange.map((item) => {
      if (item.subjectName === subjectName) {
        return {
          ...item,
          [column]: type === "number" ? +e.target.value : e.target.value,
        };
      }

      return item;
    });

    dispatch(reportSlice.actions.setCalculatedReportData(items));
  };

  return (
    <TableCell>
      <Input
        {...(type === "number" ? { type: "number", min: 0 } : { type: "text" })}
        defaultValue={value}
        onChange={(e) => handleChange(e)}
      />
    </TableCell>
  );
};

ReportCell.defaultProps = {
  type: "number",
};

export default ReportCell;
