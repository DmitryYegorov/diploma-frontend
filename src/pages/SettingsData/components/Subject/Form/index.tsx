import React from "react";
import { Paper, Grid, Button, Typography, Divider } from "@mui/material";
import { EditOutlined as EditOutlined } from "@mui/icons-material";
import FormInputText from "../../../../../components/FormInputText";
import { useForm } from "react-hook-form";
import { useStyles } from "./styled";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { createSubjectAction } from "../../../../../store/reducers/Subject/ActionCreators";

type Props = {
  subject: {
    id?: string;
    name?: string;
    createdAt?: string;
    createdBy?: string;
    shortName?: string;
  };
};

const Form: React.FC<Props> = ({ subject }: Props) => {
  const { control, handleSubmit } = useForm<{
    name: string;
    shortName: string;
  }>({
    defaultValues: {
      name: subject?.name || "",
      shortName: subject?.shortName,
    },
  });
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const {
    data: { user },
  } = useAppSelector((state) => state.auth);

  const createSubject = (data: { name: string; shortName: string }) => {
    dispatch(createSubjectAction(data));
  };

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant={"h5"}>Добавить новый предмет</Typography>
          <Divider style={{ marginTop: 10 }} />
        </Grid>
        <Grid item xs={12}>
          <FormInputText label={"Название"} name={"name"} control={control} />
        </Grid>

        <Grid item xs={6}>
          <FormInputText label={"Алиас"} name={"shortName"} control={control} />
        </Grid>
        <Grid item xs={6}>
          <Button
            startIcon={<EditOutlined />}
            variant="contained"
            fullWidth
            onClick={handleSubmit(createSubject)}
          >
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Form;
