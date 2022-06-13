import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { v4 as uuidv4 } from "uuid";
import * as _ from "lodash";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Collapse,
  IconButton,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  PictureAsPdf as PictureAsPdfIcon,
  Image as ImageIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { useAppSelector } from "../../hooks/redux";
import { UserRole } from "../../typings/enum";
import { useStyles } from "./styled";
import { FileUploader } from "react-drag-drop-files";
import moment from "moment";
import SelectForm from "../../components/SelectForm";
import { LoadingButton } from "@mui/lab";
import { useAsyncFn } from "react-use";
import { downloadFile, getFiles, uploadFiles } from "../../http/documents";
import { useForm } from "react-hook-form";
import TableList from "../../components/TableList";
import { Column } from "../../components/TableList/typings";

const fileTypeIcon = {
  "application/pdf": <PictureAsPdfIcon color={"error"} />,
  "image/jpeg": <ImageIcon color={"primary"} />,
  "image/png": <ImageIcon color={"primary"} />,
};

const DocumentsPage: React.FC = () => {
  const { t } = useTranslation(["common"], { i18n });
  const classes = useStyles();

  const {
    data: { user },
  } = useAppSelector((state) => state.auth);
  const { academicYears } = useAppSelector((state) => state.semester);

  const { register, setValue, handleSubmit } = useForm();

  const [loadFiles, setLoadFiles] = useState<Array<File>>([]);
  const [filesOptions, setOption] = useState({});

  const [uploadState, uploadFilesSubmit] = useAsyncFn(async ({ files }) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await uploadFiles(formData);

    return res.data;
  });

  const [filesState, fetchFiles] = useAsyncFn(async (options) => {
    const res = await getFiles(options);

    return res.data;
  });

  const filesColumns: Column[] = [
    {
      id: "type",
      label: t("common:filesList.type"),
      renderCell: (row) => <TableCell>{fileTypeIcon[row.type]}</TableCell>,
    },
    {
      id: "name",
      label: t("common:filesList.name"),
    },
    { id: "description", label: t("common:filesList.description") },
    { id: "authorName", label: t("common:filesList.author") },
  ];

  useEffect(() => {
    fetchFiles(filesOptions);
  }, [filesOptions, fetchFiles]);

  const [downloadState, downloadFileSubmit] = useAsyncFn(async (id) => {
    const fileData = await downloadFile(id);

    const base64Data = fileData.data.file;
    const url = `data:${fileData.headers["Content-Type"]};base64,${base64Data}`;
    // eslint-disable-next-line no-console
    console.log(url);
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", fileData.data.fileName);
    tempLink.click();
    URL.revokeObjectURL(tempLink.href);
  });

  const changeAcademicYearValue = (fileId) => {};

  const renderActions = (row) => (
    <Box>
      <IconButton>
        <EditIcon color={"primary"} />
      </IconButton>
      <LoadingButton
        loading={downloadState.loading}
        onClick={() => downloadFileSubmit(row.id)}
      >
        <DownloadIcon color={"secondary"} />
      </LoadingButton>
    </Box>
  );

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Paper style={{ padding: 10 }}>
            <Typography variant={"h5"}>{t("common:documents")}</Typography>
          </Paper>
        </Grid>
        {[UserRole.MANAGER, UserRole.ADMIN].includes(user.role) ? (
          <Grid item xs={12}>
            <FileUploader
              handleChange={(file) => {
                setLoadFiles([...loadFiles, file]);
              }}
              name="file"
              types={["PDF", "JPG", "PNG"]}
            >
              <Box className={classes.upload}>
                <CloudUploadIcon fontSize={"large"} color={"disabled"} />
              </Box>
            </FileUploader>
            <Collapse in={!!loadFiles?.length}>
              <Paper>
                <Table>
                  <TableHead>
                    <TableCell />
                    <TableCell>Наименование</TableCell>
                    <TableCell>Размер</TableCell>
                    <TableCell>Изменён</TableCell>
                  </TableHead>
                  <TableBody>
                    {loadFiles.map((file) => (
                      <TableRow>
                        <TableCell>{fileTypeIcon[file.type]}</TableCell>
                        <TableCell>
                          <Typography>{file.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{file.size}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {moment(file.lastModified).format(
                              "DD-MM-yyyy HH:mm"
                            )}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <LoadingButton
                  loading={uploadState.loading}
                  onClick={() => {
                    uploadFilesSubmit({ files: loadFiles });
                  }}
                >{`${t("common:uploadBtnLabel")} (${
                  loadFiles.length
                })`}</LoadingButton>
              </Paper>
            </Collapse>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <TableList
            rows={filesState?.value ? filesState.value : []}
            columns={filesColumns}
            isLoading={filesState.loading}
            renderActions={renderActions}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DocumentsPage;
