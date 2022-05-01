import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
    row: {
      "&:hover": {
        cursor: "pointer",
      },
    },
  })
);
