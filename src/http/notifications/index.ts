import { http } from "../index";

export const fetchUserNotifications = async (options) =>
  http.get(`/notification`, { params: options });
