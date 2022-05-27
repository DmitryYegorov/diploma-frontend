import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(2),
    },
    padding: {
      padding: theme.spacing(2),
    },
  })
);
