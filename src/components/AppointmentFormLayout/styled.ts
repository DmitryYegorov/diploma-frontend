import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padding: {
      padding: theme.spacing(2),
    },
    dateLabel: {
      paddingTop: "0px!important",
      marginTop: theme.spacing(2),
      paddingBottom: "0px!important",
      marginBottom: 0,
    },
  })
);
