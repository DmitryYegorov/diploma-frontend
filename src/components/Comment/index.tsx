import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  TextField,
  Stack,
  ButtonBase,
  Icon,
} from "@mui/material";
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import moment from "moment";
import { useStyles } from "./styled";

type Props = {
  id: string;
  authorName: string;
  createdAt: Date;
  commentText: string;
  showEditControl?: boolean;
  commitChanges?: (...args) => Promise<void | any>;
  edited?: Date | null;
  deleteComment?: (noteId: string) => Promise<void | any>;
};

const Comment: React.FC<Props> = ({
  id,
  authorName,
  createdAt,
  commentText,
  commitChanges,
  showEditControl,
  edited,
  deleteComment,
}) => {
  const classes = useStyles();

  const [editMode, setEditMode] = useState(false);
  const [comment, setComment] = useState(commentText);

  return (
    <Card className={classes.root} variant={"outlined"}>
      <CardContent>
        <Typography
          gutterBottom
          variant={"h6"}
          color="text.primary"
          className={classes.name}
        >
          {authorName}
        </Typography>
        <Typography variant={"body2"} color={"text.secondary"}>
          {moment.utc(createdAt).format("DD-MM-yyyy HH:mm")}
        </Typography>
        {edited && (
          <Typography variant="body2" color={"text.secondary"}>
            Изменен
          </Typography>
        )}

        {!editMode ? (
          <Typography variant={"body1"} className={classes.commentText}>
            {comment}
          </Typography>
        ) : (
          <Stack style={{ padding: "5px 0" }} spacing={1}>
            <ButtonBase
              component={Stack}
              direction={"row"}
              spacing={1}
              sx={{ width: 260 }}
              alignContent={"space-between"}
            >
              <Button
                variant={"contained"}
                startIcon={<SaveIcon />}
                size={"small"}
                style={{ maxWidth: 130 }}
                onClick={(e) => {
                  setEditMode(!editMode);
                  commitChanges(id, comment);
                }}
              >
                Сохранить
              </Button>
              <Button
                variant={"outlined"}
                color={"error"}
                startIcon={<CancelIcon />}
                size={"small"}
                style={{ maxWidth: 130 }}
                onClick={() => setEditMode(!editMode)}
              >
                Отменить
              </Button>
            </ButtonBase>
            <TextField
              variant={"outlined"}
              value={comment}
              fullWidth
              multiline
              onChange={(e) => setComment(e.target.value)}
            />
          </Stack>
        )}
      </CardContent>
      {showEditControl && !editMode && (
        <CardActions>
          <Button
            variant={"text"}
            size={"small"}
            onClick={() => setEditMode(!editMode)}
          >
            Редактировать
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

Comment.defaultProps = {
  showEditControl: false,
};

export default Comment;
