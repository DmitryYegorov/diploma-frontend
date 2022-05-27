import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "10px",
      borderRadius: 10,
    },
    name: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
      transition: "all 0.2s",

      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        cursor: "pointer",
      },
    },
  })
);
