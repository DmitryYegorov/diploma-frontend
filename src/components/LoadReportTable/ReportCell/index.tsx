import React from "react";
import { TableCell } from "@mui/material";

type Props = {
  value: number | string;
};

const ReportCell: React.FC<Props> = ({ value }) => {
  return <TableCell>{value}</TableCell>;
};

export default ReportCell;
