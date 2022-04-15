import React, { useEffect, useLayoutEffect } from "react";
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

const UsersPage: React.FC = () => {
  const classes = useStyles();
  const { selectedUser, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { t } = useTranslation(["auth", "role"], { i18n });

  useLayoutEffect(() => {
    if (id && !isLoading) {
      dispatch(fetchOneUserAction(id));
    }
  }, [dispatch]);

  const isActive = selectedUser && selectedUser.isActive;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.gridItem}>
            <Stack spacing={1} direction="row">
              <Typography variant="h5">
                {selectedUser &&
                  `${selectedUser.firstName} ${selectedUser.middleName} ${selectedUser.lastName}`}
              </Typography>
              <Typography variant="h6">
                (
                {selectedUser &&
                  selectedUser.role &&
                  t(`role:${selectedUser.role}`)}
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
                  <Typography variant="body1">Приглашен:</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {selectedUser &&
                      moment(selectedUser.invitedAt).format("DD.MM.yyyy")}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body1">Зарегистрирован</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {selectedUser &&
                      moment(selectedUser.createdAt).format("DD.MM.yyyy")}
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
                  {selectedUser && selectedUser.id && (
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            onChange={(e) =>
                              dispatch(
                                changeIsActiveUserStatusAction(
                                  selectedUser.id,
                                  e.target.checked
                                )
                              )
                            }
                          />
                        }
                        label={isActive ? "Деактивировать" : "Активировать"}
                      />
                    </FormGroup>
                  )}
                </TableCell>
              </TableRow>
            </Table>
          </Paper>
        </Grid>

        <Grid item>
          <Paper className={classes.gridItem}>sasxasx</Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UsersPage;
