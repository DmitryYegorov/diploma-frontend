import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      padding: 0,
      [theme.breakpoints.up(450)]: {
        justifyContent: "space-between",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(0),
      },
    },
    item: {
      marginTop: theme.spacing(3),
      fontSize: "14px",
      [theme.breakpoints.down(480)]: {
        width: "100%",
      },
      [theme.breakpoints.up(480)]: {
        width: "45%",
      },
      height: "100%",
    },
    label: {
      paddingRight: ".5rem",
    },
    card: {
      position: "relative",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "1.5rem 1rem",
      [theme.breakpoints.down(600)]: {
        paddingLeft: theme.spacing(2),
      },
    },
    cardContent: {
      maxWidth: "100%",
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    spinner: {
      position: "absolute",
      left: "50%",
    },
    container: {
      height: "100px",
    },
    field: {
      [theme.breakpoints.up(475)]: { whiteSpace: "nowrap" },
      padding: "0 2px",
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  })
);
