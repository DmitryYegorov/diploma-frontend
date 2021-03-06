import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    stack: {
      padding: theme.spacing(2),
      alignItems: "center",
    },
  })
);
