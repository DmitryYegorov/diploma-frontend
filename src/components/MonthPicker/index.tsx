import React from "react";
import Picker, { MonthBox } from "react-month-picker";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n";
import moment from "moment";

type Props = {
  month?: number;
  year?: number;
  handleAMonthChange: (e) => void;
  handleAMonthDissmis: (e) => void;
  handleClickMonthBox: (e) => void;
};

const now = new Date();

const MonthPicker: React.FC<Props> = ({
  month,
  year,
  handleAMonthChange,
  handleAMonthDissmis,
  handleClickMonthBox,
}) => {
  const { t } = useTranslation(["calendar"], { i18n });

  const pickAMonth = React.createRef();
  const pickerLang = {
    months: [
      t("calendar:month.jan"),
      t("calendar:month.feb"),
      t("calendar:month.mar"),
      t("calendar:month.apr"),
      t("calendar:month.may"),
      t("calendar:month.jun"),
      t("calendar:month.jun"),
      t("calendar:month.jul"),
      t("calendar:month.aug"),
      t("calendar:month.sep"),
      t("calendar:month.oct"),
      t("calendar:month.nov"),
      t("calendar:month.dec"),
    ],
    from: t("calendar:startDate"),
    to: t("calendar:endDate"),
  };

  const makeText = (m) => {
    if (m && m.year && m.month)
      return pickerLang.months[m.month - 1] + ". " + m.year;
    return "?";
  };

  return (
    <Picker
      ref={pickAMonth}
      years={[
        moment().add(-1, "year").year(),
        moment().year(),
        moment().add(1).year(),
      ]}
      value={{ month, year }}
      lang={pickerLang.months}
      onChange={handleAMonthChange}
      onDismiss={handleAMonthDissmis}
    >
      <MonthBox
        value={makeText({ month, year })}
        onClick={handleClickMonthBox}
      />
    </Picker>
  );
};

MonthPicker.defaultProps = {
  month: now.getMonth(),
  year: now.getFullYear(),
};

export default MonthPicker;
