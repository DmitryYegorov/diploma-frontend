import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "10px",
    },
    name: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.default,

      "&:hover": {
        backgroundColor: theme.palette.background.paper,
      },
    },
  })
);
