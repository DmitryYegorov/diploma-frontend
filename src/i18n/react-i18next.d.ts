import "react-i18next";

import common from "../../public/locales/en/common.json";
import auth from "../../public/locales/en/auth.json";
import weekDay from "../../public/locales/en/weekDay.json";

declare module "react-i18next" {
  interface Resources {
    common: typeof common;
    auth: typeof auth;
    weekDay: typeof weekDay;
  }
}
