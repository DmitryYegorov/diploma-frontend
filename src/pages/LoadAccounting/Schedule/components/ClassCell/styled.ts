import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:hover": {
        backgroundColor: theme.palette.background.default,
        cursor: "pointer",
      },
    },
  })
);
