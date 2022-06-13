import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useAsyncFn } from "react-use";
import { activateEmail } from "../../http/user";
import { CheckCircle as CheckCircleIcon } from "@material-ui/icons";
import Logo from "../../components/Logo";

const ActivateEmailPage: React.FC = () => {
  const { activationCode } = useParams();

  const [state, sendActivationRequest] = useAsyncFn(async (code: string) => {
    const res = await activateEmail(code);

    return res.data;
  });

  React.useEffect(() => {
    if (activationCode) {
      sendActivationRequest(activationCode);
    }
  }, [activationCode]);

  if (state.loading) {
    return (
      <Box style={{ position: "absolute", top: "50%", left: "50%" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!state.value || state.error) {
    return (
      <Container style={{ marginTop: 200 }}>
        <Stack alignItems="center" spacing={3}>
          <Logo size="large" />
          <Typography variant={"h5"} textAlign="center">
            К сожалению произошла ошибка, свяжитесь с администратором...
          </Typography>
        </Stack>
      </Container>
    );
  }

  const userName = `${state.value.firstName} ${state.value.middleName} ${state.value.lastName}`;

  return (
    <Container>
      <Stack alignItems="center" spacing={3}>
        <Typography variant={"h1"}>E-Mail подтверждён!</Typography>
        <Logo size={"large"} />
        <Paper style={{ padding: 10, maxWidth: 350 }}>
          <Typography>{`${userName}!`}</Typography>
          <Typography variant="body1">
            Ваш адрес электронной почты успешно подтверждён. Адмнистратору был
            отправен запрос на активацию вашего аккаунта.
          </Typography>
        </Paper>
      </Stack>
    </Container>
  );
};

export default ActivateEmailPage;
