import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TablePagination,
  TableRow,
  useMediaQuery,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { Direction } from "./typings";
import { Column } from "./typings";
import CardsList from "./Cards";
import { useStyles } from "./styled";
import { Alert, CircularProgress, Container } from "@mui/material";

type Props<T> = {
  rows: Array<T>;
  columns: Array<Column>;
  renderActions?: React.FC<T>;
  withAvatar?: boolean;
  setPage?: (page: any) => void;
  currentPage?: number;
  count?: number;
  onRowClick?: (id: any) => void;
  rowsPerPage?: number;
  setOnPage?: (count: any) => void;
  isLoading?: boolean;
  sort?: Direction;
  setSort?: (sort: any) => void;
  order?: string;
  setOrder?: (order: any) => void;
  notDataMessage: string;
  autoHeight?: boolean;
};

const TableList = <T extends { id?: number | string }>({
  rows,
  columns,
  renderActions,
  withAvatar,
  setPage,
  onRowClick,
  setOnPage,
  isLoading,
  sort,
  setSort,
  order,
  setOrder,
  notDataMessage,
  autoHeight,
}: Props<T>): React.ReactElement => {
  const classes = useStyles();
  const { t } = useTranslation(["common"]);
  const isDesktop = useMediaQuery("(min-width: 680px");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOnPage(+event.target.value);
    setPage(0);
  };

  const handleSortColumn = (columnName: string) => () => {
    const isAscending = sort === "asc";
    setSort(isAscending ? Direction.DESC : Direction.ASC);
    setOrder(columnName);
  };

  return (
    <>
      {isDesktop ? (
        <Paper
          style={{
            margin: "30px auto",
            width: "100%",
            overflowY: "scroll",
            ...(autoHeight ? {} : { height: 600, overflowY: "scroll" }),
          }}
        >
          {!rows.length ? (
            <div style={{ width: "100%" }}>
              <Alert severity="info" style={{ width: "100%" }}>
                {notDataMessage || t("common:notData")}
              </Alert>
            </div>
          ) : null}
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column: Column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sortDirection={order === column.id ? sort : false}
                    >
                      {column.sortable ? (
                        <TableSortLabel
                          active={order === column.id}
                          direction={order === column.id ? sort : Direction.ASC}
                          onClick={handleSortColumn(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                  {renderActions ? (
                    <TableCell key="actions" align="center">
                      {t("common:actions")}
                    </TableCell>
                  ) : null}
                </TableRow>
              </TableHead>
              {isLoading ? (
                <Container
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                  }}
                >
                  <CircularProgress />
                </Container>
              ) : (
                <TableBody>
                  {rows.map((row: T) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        className={classes.row}
                        // onClick={() => onRowClick(row.id)}
                      >
                        {columns.map((column: Column) => {
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          const value = row[String(column.id)];

                          if (
                            column.renderCell &&
                            typeof column.renderCell === "function"
                          ) {
                            return column.renderCell(row as T, column);
                          }

                          return (
                            <TableCell
                              key={`${column.id}-${row.id}`}
                              align={column.align}
                            >
                              {value}
                            </TableCell>
                          );
                        })}
                        {renderActions ? (
                          <TableCell key="actions" align="center">
                            {renderActions(row)}
                          </TableCell>
                        ) : null}
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <CardsList<T>
          data={rows}
          fields={columns}
          renderActions={renderActions}
          withAvatar={!!withAvatar}
          onRowClick={onRowClick}
          isLoading={isLoading}
        />
      )}

      {/*<Paper className={classes.pagination}>*/}
      {/*  <TablePagination*/}
      {/*    classes={{ toolbar: classes.toolbar }}*/}
      {/*    labelRowsPerPage={isDesktop ? t("common:rowsPerPage") : ""}*/}
      {/*    rowsPerPageOptions={[5, 10, 20, 50]}*/}
      {/*    component="div"*/}
      {/*    count={count}*/}
      {/*    rowsPerPage={rowsPerPage}*/}
      {/*    page={currentPage}*/}
      {/*    onPageChange={handleChangePage}*/}
      {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
      {/*  />*/}
      {/*</Paper>*/}
    </>
  );
};

TableList.defaultProps = {
  renderActions: null,
  withAvatar: false,
  isLoading: true,
  notDataMessage: "",
  autoHeight: false,
};

export default TableList;
