import React from "react";
import { Paper, Stack, Container, CircularProgress } from "@mui/material";
import FormInputText from "../../components/FormInputText";
import ButtonSubmit from "../../components/ButtonSubmit";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useStyles } from "./styled";
import { useForm } from "react-hook-form";
import * as AuthTypes from "../../typings/auth";
import Logo from "../../components/Logo";
import { register } from "../../http/auth";
import { useAsyncFn } from "react-use";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { RegisterFormSchema } from "../../schemas/registration";
import { yupResolver } from "@hookform/resolvers/yup";

const Register: React.FC = () => {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthTypes.Request.Login>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const { t } = useTranslation(["common", "auth"], { i18n });

  const [registerState, registerSubmit] = useAsyncFn(async (data) => {
    try {
      const res = await register(data);
      if (res.data) {
        toast.success(
          `${res.data.firstName} ${res.data.middleName} ${res.data.lastName}, аккаунт успешно создан! `
        );
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const serverError = e as AxiosError;
        toast.error(serverError.response.data.message);
      }
    }
  });

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

        {registerState.loading ? <CircularProgress /> : null}
        <Paper className={classes.root}>
          <Stack spacing={3}>
            <FormInputText
              label={t("auth:firstNameLabel")}
              name={"firstName"}
              control={control}
              errorMessage={errors.firstName?.message}
            />
            <FormInputText
              label={t("auth:middleNameLabel")}
              name={"middleName"}
              control={control}
              errorMessage={errors.middleName?.message}
            />
            <FormInputText
              label={t("auth:lastNameLabel")}
              name={"lastName"}
              control={control}
              errorMessage={errors.lastName?.message}
            />
            <FormInputText
              label={t("auth:emailLabel")}
              name={"email"}
              control={control}
              errorMessage={errors.email?.message}
            />
            <FormInputText
              label={t("auth:passwordLabel")}
              name={"password"}
              type={"password"}
              control={control}
              errorMessage={errors.password?.message}
            />
            <FormInputText
              label={t("auth:passwordRepeatLabel")}
              name={"repeatPassword"}
              type={"password"}
              control={control}
              errorMessage={errors.repeatPassword?.message}
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
