import React, { useState } from "react";
import { Divider, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { useStyles } from "./styled";
import { Week } from "../../../../typings/enum";

type Props = {
  classValue: any;
};

const ClassCell: React.FC<Props> = ({ classValue }) => {
  const classes = useStyles();

  const ClassWeekly = () => {
    const weeklyClass = classValue?.[Week.WEEKLY]?.[0];

    return (
      <Typography variant="body1">
        {weeklyClass && `${weeklyClass?.title} (${weeklyClass.room})`}
        <Typography variant="body2">{weeklyClass?.group}</Typography>
      </Typography>
    );
  };

  const ClassNonWeekly = () => {
    const firstWeek = classValue?.[Week.FIRST]?.[0];
    const secondWeek = classValue?.[Week.SECOND]?.[0];

    return (
      <Stack spacing={0.5}>
        <Typography variant="body2">
          {firstWeek && `| ${firstWeek?.title} (${firstWeek?.room})`}

          {firstWeek?.group && (
            <Typography variant="body2">{firstWeek?.group}</Typography>
          )}
        </Typography>
        <Typography variant="body2">
          {(secondWeek && `|| ${secondWeek?.title} (${secondWeek?.room})`) || (
            <div style={{ display: "none" }} />
          )}

          {secondWeek?.group && (
            <Typography variant="body2">{secondWeek?.group}</Typography>
          )}
        </Typography>
      </Stack>
    );
  };

  return (
    <>
      <TableCell
        className={classes.root}
        align="center"
        style={{ border: "1px solid #ececec", width: 150 }}
      >
        {classValue?.[Week.WEEKLY] ? <ClassWeekly /> : <ClassNonWeekly />}
      </TableCell>
    </>
  );
};

export default ClassCell;
