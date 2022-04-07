import { http } from "../index";

export const getTimes = async () => http.get("schedule/time");
