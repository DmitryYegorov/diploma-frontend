import React from "react";
import { EventType } from "../../../../../typings/enum";
import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import SelectForm from "../../../../../components/SelectForm";

type Props = {
  multiple?: boolean;
  width?: number;
  handleChange: (e: any) => void;
  value?: string;
};

const SelectLoadType: React.FC<Props> = ({ width, handleChange, value }) => {
  const { t } = useTranslation(["event", "report"], { i18n });

  const otherLoadOptions = [
    { label: "Все", value: null },
    { label: t("event:EXAM"), value: EventType.EXAM },
    { label: t("event:CONSULTATION"), value: EventType.CONSULTATION },
    { label: t("event:COURSE_WORK"), value: EventType.COURSE_WORK },
    { label: t("event:CREDIT"), value: EventType.CREDIT },
    { label: t("event:POSTGRADUATE"), value: EventType.POSTGRADUATE },
    { label: t("event:TESTING"), value: EventType.TESTING },
    { label: t("event:PRACTICE"), value: EventType.PRACTICE },
    { label: t("event:DIPLOMA_DESIGN"), value: EventType.DIPLOMA_DESIGN },
    {
      label: t("event:STATE_EXAMINATION_BOARD"),
      value: EventType.STATE_EXAMINATION_BOARD,
    },
  ];

  return (
    <SelectForm
      handleChange={handleChange}
      value={value}
      options={otherLoadOptions}
      label={t("report:otherLoadType")}
      width={width}
    />
  );
};

SelectLoadType.defaultProps = {
  multiple: false,
};

export default SelectLoadType;
