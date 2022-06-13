import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { blue } from "@mui/material/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
    },
    upload: {
      border: `3px dashed ${theme.palette.info.main}`,
      margin: `${theme.spacing(1)}px 0`,
      height: 150,
      width: "100%",
      background: blue[100],
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      borderRadius: 5,
      cursor: "pointer",
    },
  })
);
