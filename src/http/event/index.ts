import { http } from "../index";

export const getAllEvents = async () => http.get("/event");
