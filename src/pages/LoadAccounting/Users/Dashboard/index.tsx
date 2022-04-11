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
} from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import { useStyles } from "./styled";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { fetchOneUserAction } from "../../../../store/reducers/Users/ActionCreators";
import { useParams } from "react-router-dom";
import moment from "moment";

const UsersPage: React.FC = () => {
  const classes = useStyles();
  const { selectedUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (!selectedUser && id) {
      dispatch(fetchOneUserAction(id));
    }
  }, [dispatch]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.gridItem}>
            <Typography variant="h5">
              {selectedUser &&
                `${selectedUser.firstName} ${selectedUser.middleName} ${selectedUser.lastName}`}
            </Typography>
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
                  {selectedUser ? (
                    <Stack direction="row" spacing={1}>
                      <CheckCircleIcon color="success" />

                      <Typography variant="body2">
                        {moment(selectedUser.activatedAt).format("DD.MM.yyyy")}
                      </Typography>
                    </Stack>
                  ) : (
                    <CheckCircleIcon color="error" />
                  )}
                </TableCell>
              </TableRow>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UsersPage;
