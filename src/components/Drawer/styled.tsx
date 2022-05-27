import { Theme, ListItem } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

type ListItemProps = {
  $active: boolean;
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.down(300)]: {
        width: "200px",
        fontSize: "11px",
      },
      [theme.breakpoints.up(300)]: {
        width: "250px",
        fontSize: "small",
      },
      [theme.breakpoints.up("sm")]: {
        width: "300px",
        fontSize: "small",
      },
      [theme.breakpoints.up("md")]: {
        width: "350px",
        fontSize: "medium",
      },
      [theme.breakpoints.up("lg")]: {
        width: "400px",
        fontSize: "large",
      },
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      justifyContent: "space-between",
    },
    listTitle: {
      fontSize: "inherit",
      textAlign: "left",
    },
    mainItem: {
      width: "30%",
      textAlign: "left",
    },
    listItem: {
      width: "60%",
      textAlign: "left",
      flexWrap: "wrap",
      paddingLeft: "10px",
    },
    loadingSpinList: {
      display: "flex",
      height: "100%",
      backgroundColor: theme.palette.background.paper,
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down(300)]: {
        width: "200px",
      },
      [theme.breakpoints.up(300)]: {
        width: "250px",
      },
      [theme.breakpoints.up("sm")]: {
        width: "300px",
      },
      [theme.breakpoints.up("md")]: {
        width: "350px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "400px",
      },
    },
  })
);
