import "react-i18next";

import common from "../../public/locales/ru/common.json";
import auth from "../../public/locales/ru/auth.json";
import weekDay from "../../public/locales/ru/weekDay.json";
import role from "../../public/locales/ru/role.json";
import event from "../../public/locales/ru/event.json";
import calendar from "../../public/locales/ru/calendar.json";
import report from "../../public/locales/ru/report.json";
import plan from "../../public/locales/ru/plan.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof common;
      auth: typeof auth;
      weekDay: typeof weekDay;
      role: typeof role;
      event: typeof event;
      calendar: typeof calendar;
      report: typeof report;
      plan: typeof plan;
    };
  }
}
