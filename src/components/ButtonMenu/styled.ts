import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "40%",
      [theme.breakpoints.down(600)]: {
        width: "80%",
      },
    },
    outlined: {
      fontSize: "20rem",
    },
  })
);
