import React, { useLayoutEffect } from "react";
import { Paper, Stack, Container, Alert } from "@mui/material";
import FormInputText from "../../components/FormInputText";
import ButtonSubmit from "../../components/ButtonSubmit";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useStyles } from "./styled";
import { useForm } from "react-hook-form";
import * as AuthTypes from "../../typings/auth";
import {
  loginAction,
  registerAction,
} from "../../store/reducers/Auth/ActionCreators";
import Logo from "../../components/Logo";
import { useNavigate } from "react-router-dom";
import { register } from "../../http/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const Register: React.FC = () => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm<AuthTypes.Request.Login>();
  const navigate = useNavigate();

  const { t } = useTranslation(["common", "auth"], { i18n });

  const { error, registerSuccess, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const registerSubmit = (data: any) => dispatch(registerAction(data));

  return (
    <Container>
      <Stack
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "150px",
        }}
        spacing={5}
      >
        <Logo />
        {!isLoading && registerSuccess && (
          <Alert severity="success">Регистрация прошла успешно!</Alert>
        )}
        {!isLoading && error && !registerSuccess && (
          <Alert severity="error">{error}</Alert>
        )}
        <Paper className={classes.root}>
          <Stack spacing={3}>
            <FormInputText
              label={t("auth:firstNameLabel")}
              name={"firstName"}
              control={control}
            />
            <FormInputText
              label={t("auth:middleNameLabel")}
              name={"middleName"}
              control={control}
            />
            <FormInputText
              label={t("auth:lastNameLabel")}
              name={"lastName"}
              control={control}
            />
            <FormInputText
              label={t("auth:emailLabel")}
              name={"email"}
              control={control}
            />
            <FormInputText
              label={t("auth:passwordLabel")}
              name={"password"}
              type={"password"}
              control={control}
            />
            <FormInputText
              label={t("auth:passwordRepeatLabel")}
              name={"password"}
              type={"password"}
              control={control}
            />
            <ButtonSubmit
              label={t("auth:registerBtnLabel")}
              onClick={handleSubmit(registerSubmit)}
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Register;
