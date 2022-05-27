import React from "react";
import {
  Avatar,
  CircularProgress,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
  Grid,
  List,
} from "@material-ui/core";

import { Column } from "../typings";
import { useStyles } from "./styled";

type Props<T> = {
  data: Array<T>;
  fields: Array<Column>;
  withAvatar: boolean;
  renderActions?: React.FC<T>;
  onRowClick: any;
  isLoading?: boolean;
};

const CardsList = <T extends { id?: number | string; avatar?: string }>({
  data,
  fields,
  withAvatar,
  renderActions,
  onRowClick,
  isLoading,
}: Props<T>): React.ReactElement => {
  const classes = useStyles();

  return (
    <>
      {isLoading ? (
        <Grid container className={classes.container} alignItems="center">
          <CircularProgress className={classes.spinner} />
        </Grid>
      ) : (
        <Grid container className={classes.root} alignItems="center">
          {data.map((row: T) => {
            return (
              <Grid
                key={row.id}
                item
                component={Paper}
                className={classes.item}
              >
                <List disablePadding>
                  <ListItem
                    className={classes.card}
                    onClick={() => onRowClick(row.id)}
                  >
                    {withAvatar ? (
                      <ListItemAvatar>
                        <Avatar className={classes.avatar} src={row.avatar} />
                      </ListItemAvatar>
                    ) : null}

                    <ListItemText className={classes.cardContent}>
                      {fields.map((field) => {
                        if (
                          field.renderCell &&
                          typeof field.renderCell === "function"
                        ) {
                          return field.renderCell(row as T, field);
                        }
                        return (
                          <p className={classes.field}>
                            <b className={classes.label}>{`${field.label}:`}</b>
                            {
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              row[field.id]
                            }
                          </p>
                        );
                      })}
                      {renderActions ? renderActions(row) : null}
                    </ListItemText>
                  </ListItem>
                </List>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

CardsList.defaultProps = {
  renderActions: null,
};

export default CardsList;
