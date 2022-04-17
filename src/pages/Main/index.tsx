import React from "react";
import { Paper, Stack } from "@mui/material";
import { WorkHistory } from "@mui/icons-material";
import ButtonMenu from "../../components/ButtonMenu";
import { useStyles } from "./styled";
import { useNavigate } from "react-router-dom";

export const MainPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Paper elevation={2} className={classes.root}>
      <Stack spacing={2} className={classes.stack}>
        <ButtonMenu
          label={"Учёт нагрузки"}
          icon={<WorkHistory />}
          onClick={() => navigate("/load-accounting")}
        />
      </Stack>
    </Paper>
  );
};

export default MainPage;
