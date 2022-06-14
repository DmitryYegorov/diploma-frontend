import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#ececec",
    },
    name: {
      paddingBottom: theme.spacing(0.5),
      borderBottom: `2px solid ${theme.palette.primary.light}`,
      display: "inline-block",
    },
    commentText: {
      padding: `${theme.spacing(1)}px 0`,
    },
  })
);
