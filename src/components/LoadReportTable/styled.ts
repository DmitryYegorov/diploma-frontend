import { createStyles, makeStyles } from "@material-ui/core/styles";
import { tableCellClasses } from "@mui/material";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    table: {
      overflowX: "scroll",

      [`&.${tableCellClasses.body}`]: {
        border: "1px solid black",
      },
    },
    tableRow: {},
  })
);
