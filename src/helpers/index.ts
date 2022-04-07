import moment from "moment";
export const mapDateToTime = (date: Date): string => {
  return moment(date).format("HH:mm");
};
