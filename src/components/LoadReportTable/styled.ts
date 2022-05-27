import { createStyles, makeStyles } from "@material-ui/core/styles";
import { tableCellClasses } from "@mui/material";
import styled from "styled-components";
import Theme from "../../Theme";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    table: {
      overflowX: "scroll",
    },
    tableRow: {},
    tableCell: {
      [`&.${tableCellClasses.root}`]: {
        border: "1px solid black",
      },
    },
  })
);

export const Table = styled.table`
  border-collapse: collapse;
  display: block;
  overflow-x: scroll;
`;

export const TableRow = styled.tr``;

export const TableCell = styled.td`
  border: 1px solid black;
  padding: 10px;
  :hover {
    cursor: cell;
    background: ${Theme.palette.cell.main};
  }
`;

export const TableHead = styled.thead``;
export const TableBody = styled.tbody``;

export const Input = styled.input`
  outline: none;
  border: none;
  height: 100%;
  width: 100%;
  background: transparent;

  :hover {
    cursor: cell;
  }
`;
