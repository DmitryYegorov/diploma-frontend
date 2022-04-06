import React, { useLayoutEffect } from "react";
import { Paper, Stack, Container } from "@mui/material";
import FormInputText from "../../components/FormInputText";
import ButtonSubmit from "../../components/ButtonSubmit";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useStyles } from "./styled";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import * as AuthTypes from "../../typings/auth";
import { loginAction } from "../../store/reducers/Auth/ActionCreators";
import Logo from "../../components/Logo";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm<AuthTypes.Request.Login>();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const { t } = useTranslation(["common", "auth"], { i18n });

  const onSubmitLoginData = (data: AuthTypes.Request.Login) => {
    dispatch(loginAction(data));
  };

  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated, dispatch]);

  return (
    <Container>
      <Stack
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "300px",
        }}
        spacing={5}
      >
        <Logo />
        <Paper className={classes.root}>
          <Stack spacing={3}>
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
            <ButtonSubmit
              label={t("auth:loginBtnLabel")}
              onClick={handleSubmit(onSubmitLoginData)}
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Auth;
