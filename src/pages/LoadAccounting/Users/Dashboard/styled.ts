import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridItem: {
      padding: theme.spacing(1),
    },
  })
);
