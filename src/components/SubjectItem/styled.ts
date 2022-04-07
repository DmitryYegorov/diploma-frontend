import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { createTheme } from "@mui/material";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "white",
    },
  },
});

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
        backgroundColor: customTheme.palette.primary.main,
        color: customTheme.palette.primary.contrastText,
        cursor: "pointer",
      },
    },
  })
);
