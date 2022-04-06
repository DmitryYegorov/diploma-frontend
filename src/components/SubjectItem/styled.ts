import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 400,
    },
    padding: {
      padding: theme.spacing(2),
    },
  })
);
