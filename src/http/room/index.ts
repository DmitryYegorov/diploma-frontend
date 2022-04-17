import { http } from "../index";

export const getRoomList = async () => http.get("/room");
