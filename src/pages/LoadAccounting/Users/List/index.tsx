import React, { useEffect, useState } from "react";
import {
  Container,
  IconButton,
  TableCell,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { deepOrange } from "@mui/material/colors";
import {
  CheckCircle as CheckCircleIcon,
  ManageAccounts as ManageAccountsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getUsersList } from "../../../../http/user";
import { User } from "../../../../models/User";
import { Column } from "../../../../components/TableList/typings";
import TableList from "../../../../components/TableList";
import { useAsyncFn } from "react-use";

const UsersList: React.FC = () => {
  const { list } = useAppSelector((state) => state.user);

  const [users, fetchUsers] = useAsyncFn(async () => {
    const res = await getUsersList();

    return res.data.list;
  });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const navigate = useNavigate();

  const columns: Column[] = [
    { id: "name", label: "Имя" },
    {
      id: "email",
      label: "E-Mail",
      renderCell: (row) => (
        <TableCell>
          <Tooltip title={row.activationCode ? "Не подтверждён" : ""}>
            <Typography
              style={{
                ...(row.activationCode ? { color: deepOrange[500] } : {}),
              }}
            >
              {row.email}
            </Typography>
          </Tooltip>
        </TableCell>
      ),
    },
    {
      id: "isActive",
      label: "Активен",
      renderCell: (row) => (
        <TableCell>
          <CheckCircleIcon color={row.isActive ? "success" : "error"} />
        </TableCell>
      ),
    },
  ];

  const renderActions = (row) => (
    <IconButton color="primary" onClick={() => navigate(row.id)}>
      <ManageAccountsIcon />
    </IconButton>
  );

  return (
    <Container>
      <TableList
        rows={users.value ? users.value : []}
        columns={columns}
        isLoading={users.loading}
        renderActions={renderActions}
      />
    </Container>
  );
};

export default UsersList;
