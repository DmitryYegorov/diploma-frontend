import React from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import DatePicker from "../../../../components/DatePicker";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import { createAcademicYear } from "../../../../http/semester";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type Period = {
  startDate: Date;
  endDate: Date;
};

const CreateForm: React.FC = () => {
  const { t } = useTranslation(["common", "plan"], { i18n });

  const navigate = useNavigate();

  const [academicYear, setAcademicYear] = React.useState<Period>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [firstSem, setFirstSem] = React.useState<Period & { name: string }>({
    name: t("plan:semester.defaultName.autumn"),
    startDate: new Date(),
    endDate: new Date(),
  });

  const [secondSem, setSecondSem] = React.useState<Period & { name: string }>({
    name: t("plan:semester.defaultName.spring"),
    startDate: new Date(),
    endDate: new Date(),
  });

  const sendData = async () => {
    try {
      const res = await createAcademicYear({
        academicYear,
        semesters: [firstSem, secondSem],
      });
      navigate(res.data.id);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const serverError = e as AxiosError;
        toast.error(serverError.response.data.message);
      }
    }
  };

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <DatePicker
            label={t("plan:academicYear.start")}
            onChange={(date) =>
              setAcademicYear({ ...academicYear, startDate: date })
            }
            value={academicYear.startDate}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label={t("plan:academicYear.end")}
            onChange={(date) =>
              setAcademicYear({ ...academicYear, endDate: date })
            }
            value={academicYear.endDate}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <Typography>{t("plan:academicYear.firstSem")}</Typography>
            <TextField label={t("plan:semester.nameLabel")} />
            <DatePicker
              label={t("plan:academicYear.start")}
              onChange={(date) => setFirstSem({ ...firstSem, startDate: date })}
              value={firstSem.startDate}
            />
            <DatePicker
              label={t("plan:academicYear.end")}
              onChange={(date) => setFirstSem({ ...firstSem, endDate: date })}
              value={firstSem.endDate}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <Typography>{t("plan:academicYear.secondSem")}</Typography>
            <TextField label={t("plan:semester.nameLabel")} />

            <DatePicker
              label={t("plan:academicYear.start")}
              onChange={(date) =>
                setSecondSem({ ...secondSem, startDate: date })
              }
              value={secondSem.startDate}
            />
            <DatePicker
              label={t("plan:academicYear.end")}
              onChange={(date) => setSecondSem({ ...secondSem, endDate: date })}
              value={secondSem.endDate}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => {
              sendData();
            }}
          >
            OK
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateForm;
