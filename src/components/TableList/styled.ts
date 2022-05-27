import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { tableBodyClasses } from "@mui/material/TableBody";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    container: {
      margin: "30px auto",
      width: "100%",
      height: 600,
      overflowY: "scroll",
    },
    table: {
      tableLayout: "fixed",
    },
    spinner: {
      position: "absolute",
      left: "50%",
    },
    pagination: {
      margin: theme.spacing(2, 0, 3, 0),
      width: "100%",
      zIndex: 1300,
    },
    toolbar: {
      "& > div": {
        [theme.breakpoints.down(300)]: {
          margin: theme.spacing(1),
        },
      },
    },
    row: {},
  })
);
