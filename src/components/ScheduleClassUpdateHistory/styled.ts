import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padding: {
      padding: theme.spacing(2),
    },
  })
);
