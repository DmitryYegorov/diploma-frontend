import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  TableCell,
  TableRow,
  Typography,
  Table,
  Stack,
  Switch,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import { useStyles } from "./styled";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  changeIsActiveUserStatusAction,
  fetchOneUserAction,
} from "../../../../store/reducers/Users/ActionCreators";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import { useAsyncFn } from "react-use";
import {
  changeIsActiveUserStatus,
  changeUserRole,
  getOneUserById,
} from "../../../../http/user";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { LoadingButton } from "@mui/lab";
import { userRoleMap } from "../../../../helpers";
import SelectForm from "../../../../components/SelectForm";
import { UserRole } from "../../../../typings/enum";

const UsersPage: React.FC = () => {
  const classes = useStyles();
  const { selectedUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { t } = useTranslation(["auth", "role"], { i18n });

  const [confirmActivate, setConfirmActivate] = React.useState(false);

  const [user, fetchUserData] = useAsyncFn(async (userId) => {
    const res = await getOneUserById(userId);

    return res.data;
  });

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const [activationState, setActivationState] = useAsyncFn(
    async (state: boolean) => {
      const res = await changeIsActiveUserStatus(id, state);
      await fetchUserData(id);

      return res.data;
    }
  );
  const [changeRoleState, fetchChangeRole] = useAsyncFn(
    async (userId: string, role: UserRole) => {
      const res = await changeUserRole(userId, role);

      return res.data;
    }
  );

  const isActive = user.value && user.value.isActive;

  const { data } = useAppSelector((state) => state.auth);

  if (user.value)
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.gridItem}>
              <Stack spacing={1} direction="row">
                <Typography variant="h5">
                  {user.value &&
                    `${user.value.firstName} ${user.value.middleName} ${user.value.lastName}`}
                </Typography>
                <Typography variant="h6">
                  (
                  {user.value &&
                    user.value.role &&
                    t(userRoleMap[user.value.role])}
                  )
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.gridItem}>
              <Table>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1">Зарегистрирован</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.value &&
                        moment(user.value.createdAt).format("DD.MM.yyyy")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1">Активен:</Typography>
                  </TableCell>
                  <TableCell>
                    {isActive ? (
                      <Stack direction="row" spacing={1}>
                        <CheckCircleIcon color="success" />
                      </Stack>
                    ) : (
                      <CheckCircleIcon color="error" />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1">E-Mail:</Typography>
                  </TableCell>
                  <TableCell>{user.value.email}</TableCell>
                </TableRow>
              </Table>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.gridItem}>
              <Stack spacing={1}>
                {data.user.role === UserRole.ADMIN ? (
                  <SelectForm
                    label={"Роль"}
                    loading={changeRoleState.loading}
                    handleChange={(e) =>
                      fetchChangeRole(id, e.target.value as UserRole)
                    }
                    options={Object.keys(userRoleMap).map((key) => ({
                      value: key,
                      label: t(userRoleMap[key]),
                    }))}
                    value={user.value.role as UserRole}
                  />
                ) : null}

                {user.value && user.value.id && (
                  <LoadingButton
                    loading={activationState.loading}
                    variant={"outlined"}
                    onClick={() => setConfirmActivate(true)}
                  >
                    {isActive ? "Деактивировать" : "Активировать"}
                  </LoadingButton>
                )}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <ConfirmDialog
          title={"Вы уверены?"}
          contentText={
            "После подтверждения статус активности аккаунта будет изменён"
          }
          handleAgree={() => setActivationState(!isActive)}
          handleClose={() => setConfirmActivate(!confirmActivate)}
          open={confirmActivate}
        />
      </Container>
    );
};

export default UsersPage;
